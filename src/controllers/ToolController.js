const Tool = require('../models/Tool');

class ToolController {
	async store(req, res) {
		const tool = await Tool.create(req.body);
		return res.json(tool);
	}

	async find(req, res) {
		if(req.query.q) {
			var regex = new RegExp(req.query.q, "i"),
			query = {$or:[
				{description: regex},
				{title: regex},
				{link: regex},
				{tags: { $in:[regex] } }
			]};
			const tools = await Tool.find(query);
			res.json(tools);
			return;
		}
		if(req.query.tags_like) {
			var regex = new RegExp(req.query.tags_like, "i"),
			query = { tags: { $in:[regex] } };
			const tools = await Tool.find(query);
			res.json(tools);
			return;
		}
		const tools = await Tool.find();
		res.json(tools);
	}

	async remove(req, res) {
		await Tool.findByIdAndRemove(req.params.id);
		res.json({});
	}

	async showAll(req, res) {
		const tools = await Tool.find();
		res.json(tools);
	}

	async show(req, res) {
		const tool = await Tool.findById(req.params.id).populate({
			path: "tags",
			options: { sort: { createdAt: -1 } }
		});
		res.json(tool);
	}
}

module.exports = new ToolController();