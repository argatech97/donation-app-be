import {
  BadRequest,
  IPagination,
  IPayloadRequestDataDto,
  Pagination,
  PayloadRequestDto,
} from "@module/common";

export class CategoryListPayload extends PayloadRequestDto<IPagination> {
  constructor(data: IPayloadRequestDataDto) {
    super(data);
  }
  data!: IPayloadRequestDataDto;
  convertToEntity = async () => {
    try {
      this.checkProperty(["page", "limit"]);
      const { page, limit, orderBy, isDesc } = this.data;
      return new Pagination({
        page,
        limit,
        orderBy,
        isDesc,
      });
    } catch (error) {
      throw new BadRequest();
    }
  };
}
