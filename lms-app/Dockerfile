# Set master image
FROM php:8.2-fpm-alpine

# Set working directory
WORKDIR /var/www/html

# Dependencies
RUN apk --no-cache add \
        libzip-dev \
        libpng \
        libpng-dev \
        libjpeg-turbo \
        libjpeg-turbo-dev \
        freetype \
        freetype-dev \
        libwebp \
        libwebp-dev \
        zlib \
        zlib-dev \
        libxpm \
        libxpm-dev \
        icu-dev \
        nodejs \
        npm \
        mysql-client

RUN docker-php-ext-configure gd \
        --with-freetype=/usr/include/ \
        --with-jpeg=/usr/include/ \
        --with-webp=/usr/include/ \
    && docker-php-ext-install -j$(nproc) \
        zip \
        gd \
        intl \
        mysqli \
        pdo_mysql

# Install PHP Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy existing application directory
COPY . .
