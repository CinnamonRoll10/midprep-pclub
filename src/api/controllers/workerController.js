const Web3 = require('web3');
const TaskAllocationABI = require('../utils/TaskAllocationABI.json');
const config = require('../utils/config');

// Connect to the Ethereum network
const web3 = new Web3(new Web3.providers.HttpProvider(config.ethereumUrl));
const contract = new web3.eth.Contract(TaskAllocationABI, config.contractAddress);

exports.registerWorker = async (req, res) => {
    const { availableHours, expertiseLevel, minHourlyWage, walletAddress } = req.body;

    try {
        const gas = await contract.methods.registerWorker(availableHours, expertiseLevel, minHourlyWage).estimateGas({ from: walletAddress });
        await contract.methods.registerWorker(availableHours, expertiseLevel, minHourlyWage).send({ from: walletAddress, gas });

        res.status(200).send({ message: "Worker registered successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getWorkerDetails = async (req, res) => {
    const { workerId } = req.params;

    try {
        const worker = await contract.methods.getWorkerDetails(workerId).call();
        res.status(200).json(worker);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
