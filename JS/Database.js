

//window.BASE_URL = 'http://127.0.0.1:8080/'
window.BASE_URL = 'https://naveensahu143.github.io/TravelBlog'


class DataBase {

  static get DATABASE_URL() {
    return `${BASE_URL}/data/Blogs.json`;

  }


  static fetchBlogs(callback) {
    let blg = new XMLHttpRequest();
    blg.open('GET', DataBase.DATABASE_URL, true);
    blg.onload = () => {
      if (blg.status === 200) { // 200 means a success 
        const json = JSON.parse(blg.responseText);
        const blogs = json.Blogs; 
        callback(null, blogs);
      } else { 
        const error = (`Request failed ${blg.status}`);
        callback(error, null);
      }
    };
    blg.send();
  }

 

  static fetchBlogById(id, callback) {
    DataBase.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
          const blog = blogs.find(r => r.id == id);
          if (blog) { 
            callback(null, blog);
          } else { 
          callback('Restaurant does not exist', null);
          }
        }
    });
  }

 
  static fetchBlogByZone(zone, callback) {
    DataBase.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
        const results = blogs.filter(r => r.zone == zone);
        callback(null, results);
      }
    });
  }


  static fetchBlogsByCategory(category, callback) {
    DataBase.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
        const results = blogs.filter(r => r.category == category);
        callback(null, results);
      }
    });
  }

  static fetchBlogByZoneAndCategory(zone, category, callback) {
    DataBase.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
        let results = blogs
        if (zone != 'all') { 
          results = results.filter(r => r.zone == zone);
        }
        if (category != 'all') { 
          results = results.filter(r => r.category == category);
        }
        callback(null, results);
      }
    });
  }

  static fetchCategory(callback) {
    DataBase.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
        const Fcategorys = blogs.map((v, i) => blogs[i].category)
        const uniqueCategorys = Fcategorys.filter((v, i) => Fcategorys.indexOf(v) == i)
        callback(null, uniqueCategorys);
      }
    });
  }


  static fetchZones(callback) {
    DataBase.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
        const zone = blogs.map((v, i) => blogs[i].zone)
        const uniqueZones = zone.filter((v, i) => zone.indexOf(v) == i)
        callback(null, uniqueZones);
      }
    });
  }

  static urlForBlog(blog) {
    return (`${BASE_URL}/blog.html?id=${blog.id}`);
  }

  static imageUrlForUser(comment) {
    return (`${BASE_URL}/photos/comment/${comment}`);
  }

  static locationURL(location) {
    return (`${location}`);
  }

  static imageUrlForBlog(blog) {
    return (`${BASE_URL}/photos/BlogC/${blog.picture}`);
  }

  static imageUrlForBlogMain(blog){
    return (`${BASE_URL}/photos/BlogM/${blog.pictureM}`);
  }

  static imageUrlForBlogFood(blog){
    return (`${BASE_URL}/photos/BlogS/${blog.pictureF}`);
  }
}



