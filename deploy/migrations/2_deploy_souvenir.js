const Souvenir = artifacts.require("Souvenir");

module.exports = function (deployer) {
  deployer.deploy(Souvenir, "Souvenir", "SOUVENIR");
};
