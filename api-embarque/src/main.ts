import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TodasExepcionesFiltro } from './common/filtros/http-exception.filtro';
import { TiempoSalidaInterceptor } from './common/interceptores/tiemposalida.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new TodasExepcionesFiltro());
  app.useGlobalInterceptors(new TiempoSalidaInterceptor());

  const options = new DocumentBuilder()
  .setTitle("Vuelos9 API")
  .setDescription("Calendario de Vuelos")
  .setVersion("2.0.0")
  .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('/api/docs/', app,document,{
    swaggerOptions:{
      filter:true,
    }
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();