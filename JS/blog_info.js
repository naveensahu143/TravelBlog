

let blog;


document.addEventListener('DOMContentLoaded', (event) => {  
  fetchBlogFromURL();
});

 
 fetchBlogFromURL = (callback) => {
  if (self.blog) { 
    callback(null, self.blog)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { 
    error = 'No restaurant id in URL'
  
  } else {
    DataBase.fetchBlogById(id, (error, blog) => {
      self.blog = blog;
      if (!blog) {
        console.error(error);
        return;
      }
      fillBreadcrumb();
      fillBlogHTML();
      updateBlogs(blog);
      
     // callback(null, blog)
    });
  }
}

/**
 * Create blogs
 */
fillBlogHTML = (blog = self.blog) => {
  const title = document.getElementById('blog-title');
  title.innerHTML = blog.title;

  const subtitle = document.getElementById('blog-subtitle');
  subtitle.className="subtitle";
  subtitle.innerHTML = blog.subtitle;

  const image = document.getElementById('blog-img');
  image.className = 'blog-img'
  image.src = DataBase.imageUrlForBlogMain(blog);

  const category = document.getElementById('blog-category');
  category.innerHTML = blog.category;

  const content = document.getElementById('blog-content');
  content.innerHTML = blog.blogContent;

  console.log(blog);

  const FoodTitle = document.getElementById('Foodtitle');
  FoodTitle.innerHTML = blog.foodtitle;

  const imageF = document.getElementById('blogF-img');
  imageF.src = DataBase.imageUrlForBlogFood(blog);

  const FoodContent = document.getElementById('FoodContent');
  FoodContent.innerHTML = blog.foodContent;

  const FoodContent2 = document.getElementById('FoodContent2');
  FoodContent2.innerHTML = blog.foodContent2;

  const map = document.getElementById('map');
  const Gmap = document.createElement('iframe');
  Gmap.className = "Gmap";
  Gmap.src = DataBase.locationURL(blog.location);
  Gmap.width = "350";
  Gmap.height = "450";
  Gmap.frameBorder = "0";
  Gmap.style = "border:0;";
  Gmap.allowFullscreen = "";
  Gmap.ariahidden = "false";
  Gmap.tabIndex = "0";

  map.appendChild(Gmap);

  fillCommentsHTML();
}

fillCommentsHTML = (comments = self.blog.comments) => {

  const container = document.getElementById('comments-container');

  const title = document.createElement('h2');
  title.className = "Comment-head";
  title.innerHTML = 'Comments';
  container.appendChild(title);

  if (!comments) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('comment-list');
  comments.forEach(comment => {
    ul.appendChild(createCommentsHTML(comment));
  });
  container.appendChild(ul);
}

//Create comments
createCommentsHTML = (comment) => {

  const li = document.createElement('li');
  li.className = "CM";

  const divCmt = document.createElement('div');
  divCmt.className = "media mb-3"

  const divDP = document.createElement('div')
  divDP.className="text-center";

  const image = document.createElement('img');
  image.className = "mr-3 rounded-circle";
  image.src = DataBase.imageUrlForUser(comment.photo);
  image.width="100";
  image.height="100";

  const name = document.createElement('h6')
  name.className = "mt-1 mb-0 mr-3";
  name.innerHTML = comment.name;

  divDP.appendChild(image);
  divDP.appendChild(name);


  const Commentdiv = document.createElement('div');
  Commentdiv.className = "media-body";

  const Comment = document.createElement('p');
  Comment.className = "mt-3 mb-2";
  Comment.innerHTML = comment.comment;
  Commentdiv.appendChild(Comment);

  const date = document.createElement('time');
  date.className = "timeago text-muted";
  date.innerHTML = comment.date;
  Commentdiv.appendChild(date);

  const rpy = document.createElement('a');
  rpy.className = "float-right";
  rpy.href = "#";

  Commentdiv.appendChild(rpy);

  divCmt.appendChild(divDP);
  divCmt.appendChild(Commentdiv);

  li.appendChild(divCmt);

  return li;
}

 
//sidebar menu function
 
  
  updateBlogs = (blog) => {

  
  const category = blog.category;
  const zone = "all";

  const SameID = blog.id;
  
  DataBase.fetchBlogByZoneAndCategory(zone, category, (error, blogs) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      // resetBlogs(blogs);
      console.log(SameID);
      fillBlogsHTML(blogs, SameID);
    }
  })
  }

    fillBlogsHTML = (blogs, SameID) => {
    const ul = document.getElementById('blogs-list');
    
      
    blogs.forEach(blog => {
      if(blog.id != SameID)
      ul.appendChild(createBlogHTML(blog));
    });
  
  }
  
  createBlogHTML = (blog) => {
    const div = document.createElement('div');
    div.className="bg";
  
    const image = document.createElement('img');
    image.className = 'blog-img';
    image.src = DataBase.imageUrlForBlog(blog);
    div.append(image);
  
    const title = document.createElement('h2');
    title.innerHTML = blog.title;
    div.append(title);
  
    const createDate = document.createElement('p');
    createDate.innerHTML = blog.category;
    div.append(createDate);
  
    const author = document.createElement('p');
    author.innerHTML = blog.author;
    div.append(author);
  
  
    const category = document.createElement('p');
    category.innerHTML = blog.created;
    div.append(category);
  
    const subtitle = document.createElement('p');
    subtitle.className = "subtitle";
    subtitle.innerHTML = blog.subtitle;
    div.append(subtitle);
  
    const more = document.createElement('a');
    more.innerHTML = 'Read...';
    more.href = DataBase.urlForBlog(blog);
    div.append(more)

    const hr=document.createElement('hr')
    div.appendChild(hr);
  
    return div
  }

fillBreadcrumb = (blog=self.blog) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = blog.title;
  breadcrumb.appendChild(li);
}


getParameterByName = (name, url) => {
    if (!url)
      url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
      results = regex.exec(url);
    if (!results)
      return null;
    if (!results[2])
      return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
