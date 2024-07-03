import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';


(async () => {
  const port = process.env.PORT || 3000; 
  const app = await NestFactory.create(AppModule);
  
  await app.listen(port);
  console.log(`Server running on: http://localhost:${port}`);
})()


