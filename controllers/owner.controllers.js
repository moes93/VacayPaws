const ownerModel = require("../models/owner.models");

exports.postListing = (req, res, next) => {
	try {
		const postOwner = new ownerModel({
			username: req.body.username,
			title: req.body.title,
			pets: req.body.pets,
			date_from: req.body.date_from,
			date_to: req.body.date_to,
			location: req.body.location,
			additional_info: req.body.additional_info,
			payment: req.body.payment,
			image_urls: req.body.image_urls,
		});
		postOwner.save();
		res.sendStatus(201);
	} catch (err) {
		if (err) next(err);
	}
};

exports.getListings = async (req, res, next) => {
	const { username, date_from, date_to, location, pets } = req.query;

	try {
		const filters = {};
		if (username !== undefined) {
			filters.username = username;
		}
		if (location !== undefined) {
			filters.location = location;
		}
		if (pets !== undefined) {
			filters.pets = pets;
		}
		if (date_from !== undefined) {
			filters.date_from = { $gte: date_from };
		}
		if (date_to !== undefined) {
			filters.date_to = { $lte: date_to };
		}
		const ownerListing = await ownerModel.find(filters).sort();
		const ownerListingObj = { ownerListing };
		res.status(200).send(ownerListingObj);
	} catch (err) {
		if (err) next(err);
	}
};

exports.getListing = async (req, res, next) => {
	const { _id } = req.params;
	try {
		const ownerListing = await ownerModel.findOne({ _id: _id });
		const ownerListingObj = { ownerListing };
		res.status(200).send(ownerListingObj);
	} catch (err) {
		if (err) next(err);
	}
};

exports.deleteListing = async (req, res, next) => {
	const { _id } = req.params;
	console.log(_id);
	try {
		await ownerModel.deleteOne({ _id: _id });
		res.sendStatus(204);
	} catch (err) {
		if (err) next(err);
	}
};
