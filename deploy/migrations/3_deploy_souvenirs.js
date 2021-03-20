const Souvenir = artifacts.require("Souvenirs");

module.exports = function (deployer) {
  deployer.deploy(Souvenir);
};
