let favorites = [];

module.exports = {
    //Return the whole favorites array
    getAll: (req, res) => {
        res.send(favorites);
      },
    //Create (add) an item to the favorites array
    create: (req, res) => {
        const { country } = req.body;
        favorites.push(country);
        res.status(200).send(favorites);
      },
    //Delete an item from the favorites array by index
    delete: (req, res) => {
        const favoriteId = req.params.id;
        const faveIndex = favorites.findIndex(
          country => country.id == favoriteId
        );
    
        if (faveIndex == -1) {
          return res.status(404).send({
            message: "Could not find favorite with id of " + favoriteId
          });
        }
    
        favorites.splice(faveIndex, 1);
    
        res.send(favorites);
      },
    //Update a 'tag' inside the array by index
    update: (req, res) => {
        const favoriteTags = req.params.tags;
        const faveIndex = favorites.findIndex(
          country => country.tags == favoriteTags
        );
        res.send(favorites);
        return faveIndex;
      }
    };