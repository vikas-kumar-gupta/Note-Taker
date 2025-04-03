import {
  Model,
  AggregateOptions,
  PipelineStage,
  InsertManyOptions,
  QueryOptions,
  FilterQuery,
  ProjectionType,
  UpdateQuery,
  Types,
} from "mongoose";

export default class BaseEntity {
  protected model: Model<any>;
  constructor(mongoModel: Model<any>) {
    this.model = mongoModel;
  }

  ObjectId(id?: string) {
    return new Types.ObjectId(id);
  }

  async saveData<Type>(data: Type) {
    return await new this.model(data).save();
  }

  async insertMany<Type>(data: Type, options: InsertManyOptions) {
    return await this.model.insertMany(data, options);
  }

  async distinct<Type>(field: string, query: FilterQuery<any>) {
    return await this.model.distinct(field, query);
  }

  async find(
    query: FilterQuery<any>,
    projection: ProjectionType<any>,
    options: QueryOptions
  ) {
    return await this.model.find(query, projection, options).exec();
  }

  async findById(
    id: string,
    projection: ProjectionType<any> = {},
    options?: QueryOptions
  ) {
    const query = {
      _id: this.ObjectId(id),
    };
    if (options != undefined) {
      options["lean"] = true;
    } else {
      options = { lean: true };
    }
    return await this.model.findOne(query, projection, options).exec();
  }

  async findOne(
    query: FilterQuery<any>,
    projection: ProjectionType<any>,
    options?: QueryOptions
  ) {
    if (options != undefined) {
      options["lean"] = true;
    } else {
      options = { lean: true };
    }
    return await this.model.findOne(query, projection, options).exec();
  }

  async findOneAndUpdate(
    conditions: FilterQuery<any>,
    update: UpdateQuery<any>,
    options?: QueryOptions
  ) {
    if (options != undefined) {
      options["writeConcern"] = { w: "majority", wtimeout: 5000 };
    } else {
      options = {
        writeConcern: { w: "majority", wtimeout: 5000 },
        lean: true,
        new: true,
      };
    }
    return await this.model
      .findOneAndUpdate(conditions, update, options)
      .exec();
  }

  async aggregateData(
    aggregateArray: PipelineStage[],
    options?: AggregateOptions
  ) {
    if (!options) {
      options = {
        allowDiskUse: true,
      };
    }
    return await this.model.aggregate(aggregateArray, options).exec();
  }

  paginationPipeline(page?: number, limit?: number) {
    const paginationQuery = [];
    if (page && limit) {
      paginationQuery.push({ $skip: (page - 1) * limit }, { $limit: limit });
    } else {
      paginationQuery.push({ $skip: 0 });
    }

    const pipeline = [
      {
        $facet: {
          total: [{ $count: "count" }],
          rows: paginationQuery,
        },
      },
      {
        $unwind: {
          path: "$total",
          preserveNullAndEmptyArrays: false,
        },
      },
    ];

    return pipeline;
  }

  async updateOne(
    query: FilterQuery<any>,
    update: UpdateQuery<any>,
    options: any
  ) {
    return await this.model.updateOne(query, update, options).exec();
  }

  async updateMany(
    query: FilterQuery<any>,
    update: UpdateQuery<any>,
    options: any
  ) {
    return await this.model.updateMany(query, update, options).exec();
  }

  async deleteOne(query: FilterQuery<any>) {
    return await this.model.deleteOne(query);
  }

  async deleteMany(query: FilterQuery<any>) {
    return await this.model.deleteMany(query);
  }

  async replaceOne(
    query: FilterQuery<any>,
    replacement: object,
    option?: any
  ) {
    if (option == undefined) {
      option = { new: true, upsert: true };
    }
    return await this.model.replaceOne(query, replacement, option);
  }

  async countDocuments(query: FilterQuery<any>) {
    return this.model.countDocuments(query);
  }

  async paginateWithNextHit(
    pipeline: PipelineStage[],
    limit: number,
    page: number
  ) {
    if (limit) {
      limit = Math.abs(limit);
      if (limit > 100) {
        limit = 100;
      }
    } else {
      limit = 10;
    }
    if (page && page !== 0) {
      page = Math.abs(page);
    } else {
      page = 1;
    }
    const skip = limit * (page - 1);

    pipeline.push({
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        metadata: [{ $count: "total" }, { $addFields: { page } }],
      },
    });
    const result = await this.model.aggregate(pipeline).allowDiskUse(true);

    let next_hit = false;
    const total_page =
      result[0].data.length > 0
        ? Math.ceil(result[0].metadata[0].total / limit)
        : 0;
    if (result[0]["data"].length > limit) {
      result[0]["data"].pop();
    }

    if (total_page > page) {
      next_hit = true;
    }

    return {
      count: result[0]?.metadata[0] ? result[0]?.metadata[0]["total"] : 0,
      page: result[0]?.metadata[0] ? result[0]?.metadata[0]["page"] : page,
      totalPage: total_page,
      hasNextPage: next_hit,
      limit,
      rows: result[0]["data"],
    };
  }

  hasNextPage(data: any[], page: number, limit: number) {
    let hasNextPage = false;
    if (data?.length > limit) {
      hasNextPage = true;
    }

    return {
      hasNextPage: hasNextPage,
      rows: data.slice(0, limit),
    };
  }

  documentCount(data: any[]) {
    return {
      count: data.shift()?.count || 0,
    };
  }
}
