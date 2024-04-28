const elasticService = require('../services/elasticService');

exports.getHome = (req, res) => {
    res.send("Food Truck Finder API");
};

exports.performSearch = async (req, res) => {
    const key = req.query.q;
    if (!key) {
        return res.status(400).json({ status: "failure", msg: "Please provide a query" });
    }

    try {
        const responses = await elasticService.searchFoodItems(key);
        res.json(responses);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ status: "failure", msg: "Error in reaching Elasticsearch" });
    }
};
