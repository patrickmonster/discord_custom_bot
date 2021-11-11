

module.exports = (s, ...a) => {
    a.forEach((v,i) => {
        s = s.replace(new RegExp('\\{'+i+'\\}', 'gi'), v);
    });
    return s;
}