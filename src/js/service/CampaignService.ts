import CrudService from './CrudServiceZ';
import CampaignDto from '../model/dtoZ/campaign/CampaignDto';
import CampaignXDto from '../model/dtoZ/campaign/CampaignXDto';
import * as http from './HttpUtil';

class CampaignService extends CrudService<CampaignDto, any> {
    constructor() {
        super('campaigns');
    }

    public async read(): Promise<CampaignXDto> {
        return http.get<CampaignXDto>
            (`${this.resource}?include[]=client.*`);
    }

    public async getSuggestions(): Promise<{ campaigns: CampaignDto[] }> {
        return http.get<{ campaigns: CampaignDto[] }>
            (`${this.resource}?exclude[]=*&include[]=name&include[]=id`);
    }
}

export default CampaignService;