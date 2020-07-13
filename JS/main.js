
let blogs,
category,
zone

$('.carousel').carousel({
  interval: 4000
})


document.addEventListener('DOMContentLoaded', (event) => {
  fetchCategory();
  fetchZones();
  updateBlogs();
});

fetchCategory = () => {
DBHelper.fetchCategory((error, category) => {
  if (error) {
    console.error(error);
  } else {
    self.category = category;
    fillCategoryHTML();
  }
  });
}

fillCategoryHTML = (category = self.category) => {
  const select = document.getElementById('category-select');

  category.forEach(cat => {
  const option = document.createElement('option');
  option.innerHTML = cat;
  option.value = cat;
  select.append(option);
  });
}

fetchZones = () => {
DBHelper.fetchZones((error, zone) => {
  if (error) { 
    console.error(error);
  } else {
    self.zone = zone;
    fillZonesHTML();
  }
  });
}

fillZonesHTML = (zone = self.zone) => {
  const select = document.getElementById('zones-select');

  zone.forEach(zone => {
  const option = document.createElement('option');
  option.innerHTML = zone;
  option.value = zone;
  select.append(option);
  });
}


updateBlogs = () => {
const zSelect = document.getElementById('zones-select');
const cSelect = document.getElementById('category-select');

const zIndex = zSelect.selectedIndex;
const cIndex = cSelect.selectedIndex;

const zone = zSelect[zIndex].value;
const category = cSelect[cIndex].value;

DBHelper.fetchBlogByZoneAndCategory(zone, category, (error, blogs) => {
  if (error) { 
    console.error(error);
  } else {
    resetBlogs(blogs);
    fillBlogsHTML();
  }
})
}

resetBlogs = (blogs) => {
// Remove all restaurants
  self.blogs = [];
  const ul = document.getElementById('blogs-list');
  ul.innerHTML = '';
  self.blogs = blogs;
}

fillBlogsHTML = (blogs = self.blogs) => {
  const BL = document.getElementById('blogs-list');
  blogs.forEach(blog => {
  BL.appendChild(createBlogHTML(blog));
  });

}

createBlogHTML = (blog) => {


      const card = document.createElement('div');
      card.className = "card col-lg-3 col-md-4 col-sm-6";

        const title = document.createElement('h4');
        title.className = "Title";
        title.innerHTML = blog.title;
        card.append(title);

        const image = document.createElement('img');
        image.className = 'card-img-top';
        image.src = DBHelper.imageUrlForBlog(blog);
        card.append(image);

        const cardbody = document.createElement('div');  
        cardbody.className="card-body";

          const category = document.createElement('p');
          category.innerHTML = blog.category;
          cardbody.append(category);
          
          const subtitle = document.createElement('p');
          subtitle.className = "subtitle";
          subtitle.innerHTML = blog.subtitle;
          cardbody.append(subtitle);

          const more = document.createElement('a');
          more.innerHTML = 'Read more....';
          more.href = DBHelper.urlForBlog(blog);
          cardbody.append(more);

        card.appendChild(cardbody);

        const Cfooter = document.createElement('div');  
        Cfooter.className="card-footer";

          const author = document.createElement('p');
          author.className="text-muted"
          author.innerHTML = blog.author;
          Cfooter.append(author);

          const createDate = document.createElement('p');
          createDate.className = "text-muted";
          createDate.innerHTML = blog.created;
          Cfooter.append(createDate);

        card.appendChild(Cfooter);
      // CardDeck.appendChild(card);
    // li.appendChild(card);
 return card
}



