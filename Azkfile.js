/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */
// Adds the systems that shape your system
systems({
  'parse-server': {
    // Dependent systems
    depends: ['mongodb'],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/node"},
    // Steps to execute before running instances
    provision: [
      "cp .env.sample .env",
      "npm install"
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    // npm custom script
    command: ["npm", "run", "parse-server"],
    wait: 120,
    mounts: {
      '/azk/#{manifest.dir}': sync("."),
      '/azk/#{manifest.dir}/node_modules': persistent("./node_modules"),
    },
    scalable: {"default": 1},
    http: {
      domains: [
        '#{env.HOST_DOMAIN}',                   // used if deployed
        '#{env.HOST_IP}',                       // used if deployed
        '#{system.name}.#{azk.default_domain}', // default azk domain
      ]
    },
    ports: {
      // exports global variables
      http: "3000/tcp",
    },
    envs: {
      NODE_ENV: "dev",
      PORT: "3000",
      // DOMAIN will be passed to ParseServer
      DOMAIN: "#{system.name}.#{azk.default_domain}",
    },
    export_envs: {
      // will be passed to ngrok
      APP_URL: "#{system.name}.#{azk.default_domain}:#{net.port.http}"
    }
  },

'mongo-admin': {
    // Dependent systems
    depends: ['mongodb'],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/node"},
    // Steps to execute before running instances
    provision: [
      "npm install"
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    // npm custom script
    command: ["npm", "run", "mongo-admin"],
    wait: 120,
    mounts: {
      '/azk/#{manifest.dir}': sync("."),
      '/azk/#{manifest.dir}/node_modules': persistent("./node_modules"),
    },
    scalable: { default: 0, limit: 0 },
    http: {
      domains: [
        '#{system.name}.#{azk.default_domain}',
      ]
    },
    ports: {
      http: "3000/tcp",
    },
    envs: {
      NODE_ENV: "dev",
      PORT: "3000",
    }
  },

  'mongodb': {
    image : { docker: 'azukiapp/mongodb' },
    scalable: false,
    wait: 120,
    mounts: {
      '/data/parse-db': persistent('parse-db-#{manifest.dir}'),
    },
    ports: {
      http: '28017:28017/tcp',
    },
    http: {
      domains: [ '#{manifest.dir}-#{system.name}.#{azk.default_domain}' ],
    },
    export_envs: {
      DATABASE_URI: 'mongodb://#{net.host}:#{net.port[27017]}/parse-base',
      APP_URL: "tcp://#{system.name}.#{azk.default_domain}:#{net.port[27017]}"
    },
  },

  'expose-parse': {
    depends: ['mongodb'],
    image: {docker: 'azukiapp/ngrok'},
    scalable: { default: 0, limit: 0 },
    wait: 10,
    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    },
    ports: {
      http: '4040/tcp'
    },
  },

  deploy: {
    image: { docker: 'azukiapp/deploy-digitalocean' },
    mounts: {
      '/azk/deploy/src':     path('.'),
      '/azk/deploy/.ssh':    path('#{env.HOME}/.ssh'), // Required to connect with the remote server
      '/azk/deploy/.config': persistent('deploy-config')
    },

    // This is not a server. Just run it with `azk deploy`
    scalable: { default: 0, limit: 0 },

    envs: {
      // List with all available deployment settings:
      // https://github.com/azukiapp/docker-deploy-digitalocean/blob/master/README.md
      GIT_REF: 'improvement/gallery-demo',
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
    }
  }

});

setDefault('parse-server');
