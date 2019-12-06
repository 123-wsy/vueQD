export const operatUrl = (to, router) => {
    let path = [];
    let userRoles = JSON.parse(window.sessionStorage.getItem('user')).authorities;
    router.options.routes.forEach((item, i) => {
        if (item.children) {
            for (let i in item.children) {
                for (let j in item.children[i].meta.roles) {
                    let bool = true;
                    for (let k in userRoles) {
                        if (userRoles[k].authority == item.children[i].meta.roles[j]) {
                            path.push(item.children[i].path);
                            bool = false;
                        }
                    }
                    if (!bool) {
                        break;
                    }
                }
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