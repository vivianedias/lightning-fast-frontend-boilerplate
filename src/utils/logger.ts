import pino from "pino";

// create pino logger
const logger = pino({
  level: "info",
  base: {
    env: process.env.NODE_ENV,
  },
});

export default logger;
