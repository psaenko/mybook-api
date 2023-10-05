import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
	const logger = new Logger('logger');

	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('MyBook v2.0 API')
		.setDescription('RES API documentation for web app MyBook')
		.setVersion('1.0')
		.addServer('http://localhost:50000/api/', 'Local environment')
		.addServer('https://mybook.dniprorada.gov.ua/api/', 'Production environment')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/documentation', app, document);

	app.setGlobalPrefix('api');

	app.enableCors({origin: ['http://localhost:3000', process.env.CLIENT_APi]});
	await app.listen(process.env.PORT || 50000);
	logger.log(`API running on ${process.env.PORT || 50000} port`)
}

bootstrap();
