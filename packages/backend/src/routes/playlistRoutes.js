import express from "express";
import {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../controllers/playlistController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createPlaylist);
router.get("/", verifyToken, getPlaylists);
router.put("/", verifyToken, updatePlaylist);
router.delete("/:playlistId", verifyToken, deletePlaylist);
router.post("/add-song", verifyToken, addSongToPlaylist);
router.post("/remove-song", verifyToken, removeSongFromPlaylist);

export default router;
