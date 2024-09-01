const TaskAllocation = artifacts.require("TaskAllocation");

module.exports = function (deployer) {
  deployer.deploy(TaskAllocation);
};
