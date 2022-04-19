import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions()
  }
}

// mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]

const getMongoString = (configService: ConfigService) =>
  'mongodb://' + configService.get('MONGO_HOST') +
  ':' + configService.get('MONGO_PORT') +
  '/' + configService.get('MONGO_DBNAME')

const getMongoOptions = () => ({
  //for more options see Typegoose Docs
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
