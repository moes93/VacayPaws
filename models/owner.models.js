const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const OwnerListingSchema = new Schema({
	username: { type: String, required: true },
	title: { type: String, required: true },
	pets: { type: Array, required: true },
	payment: { type: Number, required: true, default: 0 },
	date_from: { type: Date, required: true },
	date_to: { type: Date, required: true },
	date_added: { type: Date, required: true, default: Date.now() },
	reviews: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Reviews",
		required: false,
	},
	rating: { type: Number, required: false },
	location: { type: String, required: true },
	image_urls: { type: Array, required: true },
	additional_info: {
		type: String,
		required: true,
		default: "No additional info",
	},
});

const OwnerListing = mongoose.model(
	"OwnerListing",
	OwnerListingSchema,
	"PetOwnerListings"
);

module.exports = OwnerListing;
