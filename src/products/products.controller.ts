import { Controller, Get, Param, Post, Delete, Put, Body } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Controller('products')
export class ProductsController {
	@Get()
	getAll() {
		return 'getAll'
	}

	@Get(':id')
	getOne(@Param() params) {
		return `getOne ${params.id}`
	}

	@Post()
	create(@Body() createProductDto: CreateProductDto): string {
		return `create ${createProductDto.title + createProductDto.price}`
	}

	@Delete(':id')
	remove(@Param('id') id: string): string {
		return `remove ${id}`
	}

	@Put(':id')
	update(
		@Body() updateProductDto: UpdateProductDto,
		@Param('id') id: string,
	): string {
		return `update ${id}, ${updateProductDto.title + updateProductDto.price}`
	}
}
