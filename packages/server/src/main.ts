import express from "express";
import { EpicProps, BannerProps } from "shared";

const app = express();

app.use("/components", express.static("../components/dist"));

app.get("/epic", (_req, res) => {
  const props: EpicProps = {
    content: {
      header: "Hello",
      body: "Give us some money",
    },
  };

  res.json({ props });
});

app.get("/banner", (_req, res) => {
  const props: BannerProps = {
    content: {
      header: "Hello",
      body: "Give us some money",
    },
    mobileContent: {
      header: "Hi",
      body: "Money",
    },
  };

  res.json({ props });
});

const PORT = 1234;

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
