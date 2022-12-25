FROM nginx:stable-alpine
COPY ./default.conf.template /default.conf.template
CMD ["/bin/sh" , "-c" , "envsubst < /default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]