//window.BASE_URL = 'http://localhost:8004/'

window.BASE_URL = 'http://127.0.0.1:8080/'
// window.BASE_URL = 'https://vksthomas.github.io/restaurant-review-app'


class DBHelper {

  static get DATABASE_URL() {
    return `${BASE_URL}/data/Blogs.json`;

  }

  /**
   * Fetch all restaurants.
   */
  static fetchBlogs(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.DATABASE_URL, true);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const blogs = json.Blogs; 
        callback(null, blogs);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }

  /**
   * Fetch a restaurant by its ID.
   */

  static fetchBlogById(id, callback) {
    // fetch particular blog with proper error handling.
    DBHelper.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
          const blog = blogs.find(r => r.id == id);
          if (blog) { // Got the restaurant
            callback(null, blog);
          } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
          }
        }
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchBlogByZone(zone, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = blogs.filter(r => r.zone == zone);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchBlogsByCategory(category, callback) {
    // Fetch all restaurants
    DBHelper.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = blogs.filter(r => r.category == category);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchBlogByZoneAndCategory(zone, category, callback) {
    // Fetch all restaurants
    DBHelper.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
        let results = blogs
        if (zone != 'all') { // filter by cuisine
          results = results.filter(r => r.zone == zone);
        }
        if (category != 'all') { // filter by neighborhood
          results = results.filter(r => r.category == category);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchCategory(callback) {
    // Fetch all restaurants
    DBHelper.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const Fcategorys = blogs.map((v, i) => blogs[i].category)
        // Remove duplicates from neighborhoods
        const uniqueCategorys = Fcategorys.filter((v, i) => Fcategorys.indexOf(v) == i)
        callback(null, uniqueCategorys);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchZones(callback) {
    // Fetch all restaurants
    DBHelper.fetchBlogs((error, blogs) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const zone = blogs.map((v, i) => blogs[i].zone)
        // Remove duplicates from cuisines
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

