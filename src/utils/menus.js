export const operatUrl = (to, router) => {
    let path = [];

    return true;
}

export const allUrl = (to, router) => {
    let path = [];
    router.options.routes.forEach((item, i) => {
        if (item.children) {
            for (let i in item.children) {
                path.push(item.children[i].path);
            }
        } else {
            path.push(item.path);
        }
    })

    for (let i in path) {
        if (to.path == path[i]) {
            return true;
        }
    }
    return false;
}