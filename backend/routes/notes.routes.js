const { Router } = require("express");
const router = Router();

const { verifyAccessToken } = require("../middleware/verification/verifyToken");

router
  .route("/:id")
  .all(verifyAccessToken)
  .get((req, res) => {
    res.status(200).json({
      message: "Note found",
      note: {
        _id: req.params.id,
        title: "illo provident consectetur",
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus voluptates hic sit veritatis culpa cumque in pariatur recusandae rem iure voluptas placeat provident exercitationem, suscipit nisi consectetur sint quaerat.\n Cumque quae officia suscipit impedit repellendus perferendis recusandae maiores voluptas debitis quod, culpa nemo libero odit dignissimos aspernatur deserunt corrupti quaerat nam necessitatibus nostrum similique ullam doloribus. Ullam facere nesciunt totam rerum esse distinctio praesentium modi porro perferendis? Quod magnam animi nihil, sunt illo provident consectetur quaerat voluptatum necessitatibus! Debitis culpa nam distinctio omnis magnam quis, magni itaque doloremque aliquid maxime beatae perspiciatis aperiam delectus quisquam sint pariatur placeat quas impedit laboriosam odit voluptates, reprehenderit inventore quae quam. Reiciendis ut amet aut unde mollitia accusantium voluptatem molestiae, consequuntur nisi est culpa necessitatibus!\n Perspiciatis ducimus fugiat maxime suscipit vero laudantium vitae dolorum temporibus cum culpa omnis veniam, porro dolores quam inventore amet. Nostrum corrupti eligendi blanditiis? Quibusdam totam doloremque vel, ratione recusandae fugit rerum explicabo at quam consequuntur fugiat nostrum enim? Ad accusamus ratione qui aspernatur adipisci!\n Temporibus facere ab exercitationem accusantium praesentium repellat culpa impedit cumque quas natus, libero nesciunt sequi voluptatem delectus dolores ipsum? Exercitationem deserunt placeat quod magnam quae necessitatibus dolore ea tempora enim architecto ipsam eligendi culpa repellendus porro amet neque minima, sint, eaque incidunt saepe minus doloribus, hic blanditiis.\n Est laudantium nam rem, exercitationem debitis dicta eum quod in mollitia repellendus facilis commodi, incidunt esse, similique suscipit. Unde, consectetur? Quisquam, maiores quaerat nulla atque sint totam distinctio architecto dolores! Sequi sed temporibus asperiores mollitia molestias itaque consectetur.`,
      },
    });
  });
module.exports = router;
