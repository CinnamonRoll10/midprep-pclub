const Web3 = require('web3');
const TaskAllocationABI = require('../utils/TaskAllocationABI.json');
const config = require('../utils/config');

const web3 = new Web3(new Web3.providers.HttpProvider(config.ethereumUrl));
const contract = new web3.eth.Contract(TaskAllocationABI, config.contractAddress);

exports.addTask = async (req, res) => {
    const { timeRequired, expertiseLevel, hourlyWage, deadline, isDivisible } = req.body;

    try {
        const gas = await contract.methods.addTask(timeRequired, expertiseLevel, hourlyWage, deadline, isDivisible).estimateGas({ from: config.adminWallet });
        await contract.methods.addTask(timeRequired, expertiseLevel, hourlyWage, deadline, isDivisible).send({ from: config.adminWallet, gas });

        res.status(200).send({ message: "Task added successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.allocateTask = async (req, res) => {
    const { taskId, workerId } = req.body;

    try {
        const gas = await contract.methods.allocateTask(taskId, workerId).estimateGas({ from: config.adminWallet });
        await contract.methods.allocateTask(taskId, workerId).send({ from: config.adminWallet, gas });

        res.status(200).send({ message: "Task allocated successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getTaskDetails = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await contract.methods.getTaskDetails(taskId).call();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
