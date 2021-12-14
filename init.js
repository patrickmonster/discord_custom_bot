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

const target = `${__dirname}/shard`;

/**
 * 컴포넌트 호출 관리자
 * @param {*} client
 * @param {*} target
 */
function load(client, target) {
	try {
		console.log(`[샤드관리자] 파일등록- ${target}`);
		const { name, excute } = require(target);
		client[name] = function(...arges) {
			try {
				excute(client, ...arges);
			}
			catch (e) { console.log(`[명령실행오류] ${name}`); }
		};
	}
	catch (e) {
		console.log(`[샤드관리자] 파일제거(경고)- ${target}`);
	}
}

/**
 * 샤드 IPC이벤트 동기화 용도
 * @param {*} client 
 * @returns 
 */
module.exports = function(client) {
	const commandFolders = fs.readdirSync(target).filter(file => file.endsWith('.js'));
	for (const file of commandFolders) {
		const path = `${target}/${file}`;
		try {
			load(client, path);
			nocache(path, (path) => {
				load(client, path);
			});
		}
		catch (e) {
			console.log(`[샤드관리자]잘못된 정의 - ${path}`);
		}
	}

	return () => {
		const commandFolders = fs.readdirSync(target).filter(file => file.endsWith('.js'));
		for (const file of commandFolders) {
			const path = `${target}/${file}`;
			delete require.cache[require.resolve(path)];
			try {
				load(client, path);
			}
			catch (e) {
				console.log(`[파일관리자] 파일제거(경고)- ${target}`);
			}
		}
	};
};
