import hive from "@hiveio/hive-js";

hive.api.getAccounts(["ipeeyay"], (err, result) => {
  if (err) {
    res.send(err);
  } else {
    res.send(result);
  }
});
