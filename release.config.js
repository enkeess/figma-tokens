module.exports = {
  repositoryUrl: process.env.CI_GIT_REPOSITORY_URL || undefined,
  ...require('@cloud-ru/ft-config-semantic-release').defaultReleaseConfig({ shouldPublishPackage: true }),
};
