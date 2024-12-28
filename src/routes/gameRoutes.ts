import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import generateGameDescription from "../services/openaiService";

const router = Router();
const prisma = new PrismaClient();

router.get("/games/update-description" , async (_req:any, res:any)=>{
    console.log("called");
    
    try {
        const games = await prisma.games.findMany({
          where: {description:""},
          select: { id: true, name: true, providerId: true, gameTypeId: true },
        });
    
        if (!games.length) {
          return res.status(200).json({ message: "No games found that need descriptions updated." });
        }else{
          console.log(games[0]);
          
        }
    
        for (let i = 0; i<=games.length ; i++) {
            console.log(games[i].name);
            
          const provider = await prisma.providers.findUnique({
            where: { id: games[i].providerId },
            select: { name: true },
          });
    
          const gameType = await prisma.game_types.findUnique({
            where: { id: games[i].gameTypeId },
            select: { name: true },
          });
    
          const newDescription = await generateGameDescription(
            games[i].name,
            provider?.name || "Unknown Provider",
            gameType?.name || "Unknown Type"
          );
    
          await prisma.games.update({
            where: { id: games[i].id },
            data: { description: newDescription },
          });
        }
    
        res.status(200).json({ message: "Game descriptions updated successfully." });

      } catch (error) {
        console.error("Error updating game descriptions:", error);
        res.status(500).json({ message: "Internal server error." });
      }
})

export default router;
