import { BadRequest, IPayloadRequestDataDto, PayloadRequestDto } from "@module/common";
import { IStoryRequestPayload } from "../entity";

export class StoryPayloadDto extends PayloadRequestDto<IStoryRequestPayload> {
  constructor(data: IPayloadRequestDataDto) {
    super(data);
  }
  convertToEntity = async () => {
    try {
      this.checkProperty(["story"]);
      const { story } = this.data;
      return {
        story,
      };
    } catch (error) {
      throw new BadRequest();
    }
  };
}
