import { Router } from "express";
import { JobController } from "../controllers/job.controller";

const jobController = new JobController();
const router = Router();

router.get("/", jobController.getAllJobs);
router.get("/:jobId", jobController.getJobById);
router.post("/", jobController.createJob);
router.put("/:jobId", jobController.updateJob);
router.delete("/:jobId", jobController.deleteJob);

export default router;
