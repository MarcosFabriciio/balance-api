import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	const app: INestApplication<any> = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Balance API')
		.setDescription('Simple balance API to EBANX Software Engineer Take-home assignment')
		.setVersion('1.0')
		.build();

	const documentFactory: () => any = (): any => SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('docs', app, documentFactory, {
		jsonDocumentUrl: 'swagger/json',
	});

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
