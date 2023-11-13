import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Author {
	@Prop({ required: true, unique: true })
	name: string;
}

export type AuthorDocument = Author & Document;
export const AuthorModel = SchemaFactory.createForClass(Author);
