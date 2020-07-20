const dummy = (blogs) => {
    return 1;
}
const totalLikes = (blogs) => {
    const total = (sum, cur) => {
        return sum + cur.likes;
    }
    return blogs.reduce(total, 0);
}
const favouriteBlog = (blogs) => {
    let fav = blogs[0];
    blogs.forEach(el => {
        fav = fav.likes < el.likes ? el : fav;
    })
    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    }
}
const mostBlogs = (blogs) => {
    let count = [];
    let c = [];
    blogs.forEach(el => {
        count.push(el.author);
        c.push(0);
    })
    for (let i = 0; i < count.length; i++) {

        if (count.indexOf(count[i]) !== i) {
            c[count.indexOf(count[i])]++;
        } else {
            c[count.indexOf(count[i])]++;
        }
    }
    let most = c[0];
    let author = count[0]
    for (let i = 1; i < c.length; i++) {
        if (c[i] > most) {
            most = c[i];
            author = count[i]
        }
    }
    return {
        author: author,
        blogs: most
    }
}



const mostLikes = (blogs) => {
    let count = [];
    let c = [];
    blogs.forEach(el => {
        count.push(el.author);
        c.push(0);
    })

    for (let i = 0; i < blogs.length; i++) {

        if (count.indexOf(blogs[i].author) !== i) {
            c[count.indexOf(blogs[i].author)] += blogs[i].likes
        } else {
            c[count.indexOf(blogs[i].author)] += blogs[i].likes
        }

    }
    let author = count[0];
    let most = c[0];
    for (let i = 1; i < c.length; i++) {
        if (c[i] > most) {
            most = c[i];
            author = count[i]
        }
    }
    return {
        author: author,
        likes: most
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
