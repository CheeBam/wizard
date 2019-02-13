export function isEditPage(props) {
    const {match: {params: { id }}} = props;
    return Boolean(id);
}

const kek = (user, i) => {
    console.log(i, user[`phone${++i}`]);
    if (user[`phone${i}`]) {
        kek(user, i);
    } else {
        return i;
    }
};

export function countPhones(user) {
    let i = 1;
    while (true) {
        if (user[`phone${i}`]) {
            ++i;
        } else{
            return --i;
        }
    }
}
