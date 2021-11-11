const fs = require('fs');

/**
 * 모듈 캐시 제거 - 파일업데이트시
 * @param {*} module
 */
function nocache(module, callback) {
	fs.watchFile(
		require('path').resolve(module), () => {
			delete require.cache[require.resolve(module)];
			callback(module);
		});
}

function load(commandsDir) {
	const command = new Map();
	const commandFolders = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));
	const map = new Map();
	const help = [];
	for (const file of commandFolders) {
		loadCmd(command, map, `${commandsDir}/${file}`);
	}
	return { command, help, map };
}

/**
 * 커맨드 로드 모듈 - 파일 수정시, 자동으로 업데이트
 * @param {*} command 명령어(인식)
 * @param {*} map 경로 맵
 * @param {*} path 경로
 * @returns
 */
function loadCmd(command, map, path) {
	const reload = (module) => {
		try {
			const cmd = require(path);
			console.log(`[파일관리자] 파일 ${module ? '업데이트' : '생성'} - ${path}`);
			command.set(cmd.name, cmd);// 명령 탐색용
			map.set(path, cmd);

			cmd._path = path;// 경로
		}
		catch (e) {
			console.error(e);
			console.log(`[파일관리자] 파일 제거 - ${path}`);
			const cmd = map.get(path);
			command.delete(cmd.name);
			map.delete(path);
		}
	};
	reload();
	nocache(path, reload);// 변경사항 등록
	// cmd._lastUpdate = `${fs.statSync(path).mtime}`;// 마지막 수정시간
}
/**
 * 커맨드 관리 모델
 * @param {*} target 탐색위치
 */
module.exports = function getCommands(target) {
	// Collection, list, map
	const { command, help, map } = load(target);
	// getList()
	return {
		command, help,
		get: (cmd) => command.get(cmd) || command.find(c => c.aliases && c.aliases.includes(cmd)),
		update: () => {
			const commandFolders = fs.readdirSync(target).filter(file => file.endsWith('.js'));
			for (const file of commandFolders) {
				const path = `${target}/${file}`;
				if (!map.has(path)) {// 파일이 없는것만 추가
					loadCmd(command, map, path);// 불러오기
				}// 넘어가
				// 도움말 업데이트
				help.length = 0;
				map.forEach((c) => {
					if (c.help) {help.push(c.help);}
				});
			}
		},
	};
};
