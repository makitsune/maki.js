var fs = require("fs");
var requests = require("sync-request");
var svg = require(global.__dirname+"/modules/svg");
var Datauri = require("datauri");
var datauri = new Datauri();

module.exports = function(msg) {
	// cache their avi
	let user_avatar = requests("GET", msg.author.displayAvatarURL).getBody();
	fs.writeFileSync(global.__dirname+"/cache/avatars/"+msg.author.id+".png", user_avatar);

	// get users waifus
	let waifu = global.db.prepare("SELECT waifu FROM users WHERE id = '"+msg.author.id+"';").get().waifu;
	waifu = (!waifu)? []: JSON.parse(waifu);

	if (msg.mentions.users.array()[0] == null) {
		msg.channel.send(
			"You have **"+waifu.length+" waifu"+((waifu.length==1)?"":"s")+"**.\n"+
			"To add a waifu, try **"+global.prefix+"waifu (@mention)**"
		);
		return;
	}

	let waifu_id = msg.mentions.users.array()[0].id;
	if (!waifu) {
		// first waifu
		waifu = [waifu_id];
	} else {
		// check if more than 9
		if (waifu.length>=9) {
			msg.channel.send("You already have **9 waifus!** Try **"+global.prefix+"dewaifu (user)**");
			return;
		}

		// check if already waifu'd
		if (waifu.includes(waifu_id)) {
			msg.channel.send("**"+msg.mentions.users.array()[0].username+"** is already your waifu!");
			return;
		}

		waifu.push(waifu_id);
	}

	// download persons avatar
	let waifu_avatar = requests("GET", msg.mentions.users.array()[0].displayAvatarURL).getBody();
	fs.writeFileSync(global.__dirname+"/cache/avatars/"+waifu_id+".png", waifu_avatar);

	// update db
	global.db.prepare("UPDATE users SET waifu = ? WHERE id = ?;").run(JSON.stringify(waifu), msg.author.id);

	// show waifu image
	msg.channel.startTyping();
	svg.render(fs.readFileSync(global.__dirname+"/svg/waifu.svg", "utf8")
		.replace(/\[avatar_0\]/g, datauri.format(".png", user_avatar).content)
		.replace(/\[avatar_1\]/g, datauri.format(".png", waifu_avatar).content),
	352, 128).then(buffer=>{
		msg.channel.send("**"+msg.author.username+"** is now in love with **"+msg.mentions.users.array()[0].username+"**!", {
			files: [{ attachment: buffer }]
		});
		msg.channel.stopTyping();
	});
}