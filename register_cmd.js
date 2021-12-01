require('dotenv').config();

const { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } = require('@discordjs/builders');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');


// const getCommands = require('#util/getCommands'); // 커맨드 관리자


// const c = getCommands(`${__dirname}/button`);


// const rest = new REST({ version: '9' }).setToken("NzEwODI1NzY3MjMxMjkxNDIz.Xr6GFQ.K95XAlGmTSuKhS0E2ccVN2wrMAc");


// const cmd = c.command.map(({name, description, options, noCmd}) =>{
// 	if(!noCmd)
// 		return {name, description : description || "설명이 없습니다" , options : options || []};
// 	else return false
// }).filter((d)=>d);

// console.log(cmd);

// process.exit();

const test = new SlashCommandBuilder()
	.setName("test")
	.setDescription("tttttt")
	.setDefaultPermission(false)
	.addBooleanOption(o=>
		o.setName("sub")
		.setDescription("sub tttt")
		.setRequired(false)
	)
	.addRoleOption(o=>
		o.addRoleOption()
	)

console.log(test);


;(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		// const commands = await rest.get(
		// 	Routes.applicationGuildCommands("710825767231291423","758198194856919057"),
		// 	// Routes.applicationCommands("710825767231291423"),
		// 	// { 
		// 	// 	body: cmd
		// 	// },
		// );
		// console.log(commands);
		// commands.forEach(({id})=>{
		// 	console.log(id);
		// 	rest.delete(
		// 		Routes.applicationCommand("710825767231291423",id)
		// 	).catch(e=>{
		// 		console.log("error" , id);
		// 	})
		// });

		

		await rest.put(
			Routes.applicationGuildCommands("710825767231291423","758198194856919057"),
			// Routes.applicationCommands("710825767231291423"),
			{ 
				body: [
					{
						name : "clip",
						description : "클립",
						type : 1,
						options : [
							{
								name : "video_id",
								type : 4,
								description: "가져올 비디오 ID"
							},
							{
								name : "name",
								type : 3,
								description: "가져올 비디오 이름"
							}
						]
					}
				]
			},
		);
		console.log('Successfully reloaded application (/) commands.');
		process.exit()
	} catch (error) {
		console.error(error);
	}
})