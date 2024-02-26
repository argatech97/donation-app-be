import { BadRequest, IPayloadRequestDataDto, PayloadRequestDto } from "@module/common";

export class StoryDetailPayloadDto extends PayloadRequestDto<{ id: string }> {
  constructor(data: IPayloadRequestDataDto) {
    super(data);
  }
  convertToEntity = async () => {
    try {
      this.checkProperty(["id"]);
      const { id } = this.data;
      return {
        id,
      };
    } catch (error) {
      throw new BadRequest();
    }
  };
}
