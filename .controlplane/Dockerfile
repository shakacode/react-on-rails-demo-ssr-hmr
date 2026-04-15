ARG RUBY_VERSION=3.1.2

FROM docker.io/library/node:22-bullseye-slim AS node
FROM ruby:$RUBY_VERSION

RUN apt-get update

WORKDIR /app

# Keep Node.js available both for asset compilation and for SSR runtimes that
# rely on ExecJS in production.
COPY --from=node /usr/local/ /usr/local/

# Expose Corepack-managed shims so later build steps can call yarn/pnpm
# directly during asset precompilation hooks.
RUN printf '%s\n' '#!/bin/sh' 'exec corepack yarn "$@"' > /usr/bin/yarn && \
    chmod +x /usr/bin/yarn && \
    printf '%s\n' '#!/bin/sh' 'exec corepack pnpm "$@"' > /usr/bin/pnpm && \
    chmod +x /usr/bin/pnpm

# install ruby gems
COPY Gemfile* ./

RUN bundle config set without 'development test' && \
    bundle config set with 'staging production' && \
    bundle install --jobs=3 --retry=3

COPY . ./

# Install JavaScript dependencies only when the project actually has them.
RUN if [ -f package.json ]; then \
      package_manager="$(node -p "require('./package.json').packageManager || ''")"; \
      if [ -f yarn.lock ]; then \
        if printf '%s' "$package_manager" | grep -q '^yarn@'; then \
          corepack prepare "$package_manager" --activate && \
            (corepack yarn install --immutable || corepack yarn install --frozen-lockfile); \
        else \
          npm install -g yarn && \
            (yarn install --immutable || yarn install --frozen-lockfile); \
        fi; \
      elif [ -f pnpm-lock.yaml ]; then \
        if printf '%s' "$package_manager" | grep -q '^pnpm@'; then \
          corepack prepare "$package_manager" --activate && \
            corepack pnpm install --frozen-lockfile; \
        else \
          corepack prepare pnpm@latest --activate && \
            corepack pnpm install --frozen-lockfile; \
        fi; \
      elif [ -f package-lock.json ]; then \
        npm ci; \
      else \
        npm install; \
      fi; \
    fi

ENV RAILS_ENV=production

# compiling assets requires any value for ENV of SECRET_KEY_BASE
ENV SECRET_KEY_BASE=NOT_USED_NON_BLANK

RUN rails assets:precompile

# add entrypoint
COPY .controlplane/entrypoint.sh ./
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["rails", "s"]
