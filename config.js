//Create and export configuration variables
//Geberal container for all the environments

let environments = {}

//Staging (default) environment
environments.staging = {
    'port': 3000,
    'envName': 'staging'
}

//Production environment
environments.staging = {
    'port': 5000,
    'envName' :'production'
}

//Determining whch environment was passed as a command line argument
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''

//Check that the current environment is one of the environments above. If not default to staging
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging


module.exports = environmentToExport