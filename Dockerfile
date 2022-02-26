FROM public.ecr.aws/lambda/nodejs:14 AS builder
ARG GH_PACKAGE_TOKEN
RUN npm install -g yarn
WORKDIR /var/build
COPY . /var/build
RUN yarn install
RUN yarn build

FROM public.ecr.aws/lambda/nodejs:14 AS final
RUN yum -y update
COPY --from=builder /var/build/dist ${LAMBA_TASK_ROOT}
