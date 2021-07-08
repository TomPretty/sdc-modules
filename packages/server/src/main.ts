import express from "express";
import { EpicProps, BannerProps, getFormattedDate } from "shared";

const app = express();

// We only need to do this in DEV, to serve the components locally
app.use("/components", express.static("../components/dist"));

// Some example endpoints for the epic and banner data requests
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

// Just a random endpoint; I wanted the 'shared' package to itself have a dependency (date-fns)
// and check that it all worked as expected
app.get("/date", (_req, res) => {
  res.json({ date: getFormattedDate() });
});

const PORT = 1234;

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
