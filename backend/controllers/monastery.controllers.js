import logger from "../utils/logger.js"
import colors from "colors"

const getAllMonasteries = (req, res) => {
    logger.info(`${colors.magenta('getAllMonasteries')}`)
    res.status(200).json({ message: 'getAllMonasteries' })
}

export { getAllMonasteries }