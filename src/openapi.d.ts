import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * A9A8Be53909Cf4133D06Aa7D49329Cd7
         */
        export interface A9A8Be53909Cf4133D06Aa7D49329Cd7 {
            /**
             * A9A8Be53909Cf4133D06Aa7D49329Cd7.sentiment
             */
            sentiment: string;
            /**
             * A9A8Be53909Cf4133D06Aa7D49329Cd7.topic
             */
            topic: string;
        }
        export interface APIKey {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            key?: string;
            name?: string;
            UserId?: string;
            status?: "ARCHIVED" | "ACTIVE";
        }
        /**
         * Access
         */
        export interface Access {
            /**
             * Access.group_ids
             */
            group_ids: number[];
        }
        export interface Agent {
            id?: string;
            externalID?: string;
            name?: string;
            email?: string;
            type?: "HUMAN" | "BOT";
            organizationID?: string;
        }
        /**
         * AgentPerformanceReport
         */
        export interface AgentPerformanceReport {
            /**
             * AgentPerformanceReport.name
             */
            name: string;
            /**
             * AgentPerformanceReport.request
             */
            request: /* PerformanceRequest */ PerformanceRequest;
            /**
             * AgentPerformanceReport.records
             */
            records: {
                [name: string]: /* PerformanceAgentRecord */ PerformanceAgentRecord;
            };
            /**
             * AgentPerformanceReport.summary
             */
            summary: /* PerformanceSummary */ PerformanceSummary;
        }
        /**
         * Answer
         */
        export interface Answer {
            /**
             * Answer.id
             */
            id: string;
            /**
             * Answer.label
             */
            label: string;
        }
        export interface App {
            id?: string;
            name?: string;
            description?: string | null;
            status?: "PUBLIC" | "HIDDEN" | "ARCHIVED" | "DEV";
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            externalID?: string;
            clientID?: string;
            slug?: string;
            applicationKind?: "TRANSLATOR" | "SALESFORCE" | "JIRA" | "AUTOTAGS" | "AICRM" | "TWILIO" | "VISITOREDITOR" | "CUSTOMERIO" | "CHATSEXPORTER" | "LOGS" | "AGENTCHAT";
            source?: "HD" | "LC";
        }
        export interface AppOAuth {
            id?: string;
            clientID?: string;
            clientSecret?: string;
            redirectURI?: string;
        }
        export interface AppOnOrganization {
            id?: string;
            organizationID?: string;
            appSlug?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
        }
        export interface AppOrganizationAuth {
            id?: string;
            organizationID?: string;
            appSlug?: string;
            token?: string | null;
            tokenExpiresAt?: string | null; // date-time
            refreshToken?: string | null;
        }
        /**
         * Attachment
         */
        export interface Attachment {
            /**
             * Attachment.url
             */
            url: string;
            /**
             * Attachment.cid
             */
            cid: string;
            /**
             * Attachment.name
             */
            name: string;
            /**
             * Attachment.size
             */
            size: number;
            /**
             * Attachment.type
             */
            type: string;
            /**
             * Attachment.sha256
             */
            sha256: string;
            /**
             * Attachment.token
             */
            token: string;
        }
        export interface Automation {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            name?: string;
            description?: string;
            enabled?: boolean;
        }
        /**
         * AvailabilityFilters
         */
        export interface AvailabilityFilters {
            /**
             * AvailabilityFilters.from
             */
            from: string;
            /**
             * AvailabilityFilters.to
             */
            to: string;
            /**
             * AvailabilityFilters.groups
             */
            groups?: {
                /**
                 * AvailabilityFilters.groups.values
                 */
                values: number[];
            };
            /**
             * AvailabilityFilters.agents
             */
            agents?: {
                /**
                 * AvailabilityFilters.agents.values
                 */
                values: string[];
            };
        }
        /**
         * AvailabilityRecord
         */
        export interface AvailabilityRecord {
            /**
             * AvailabilityRecord.hours
             */
            hours?: number;
        }
        /**
         * AvailabilityReport
         */
        export interface AvailabilityReport {
            /**
             * AvailabilityReport.name
             */
            name: string;
            /**
             * AvailabilityReport.request
             */
            request: /* AvailabilityRequest */ AvailabilityRequest;
            /**
             * AvailabilityReport.total
             */
            total: number;
            /**
             * AvailabilityReport.records
             */
            records: {
                [name: string]: /* AvailabilityRecord */ AvailabilityRecord;
            };
        }
        /**
         * AvailabilityRequest
         */
        export interface AvailabilityRequest {
            /**
             * AvailabilityRequest.distribution
             */
            distribution: "day" | "hour";
            /**
             * AvailabilityRequest.timezone
             */
            timezone: string;
            /**
             * AvailabilityRequest.filters
             */
            filters: /* AvailabilityFilters */ AvailabilityFilters;
        }
        /**
         * Button
         */
        export interface Button {
            /**
             * Button.type
             */
            type: any;
            /**
             * Button.text
             */
            text: string;
            /**
             * Button.value
             */
            value: string;
            /**
             * Button.postback_id
             */
            postback_id: string;
            /**
             * Button.user_ids
             */
            user_ids: string[];
        }
        /**
         * Chat
         */
        export interface Chat {
            /**
             * Chat.id
             */
            id: string;
            /**
             * Chat.users
             */
            users: /* User */ User[];
            /**
             * Chat.thread
             */
            thread: /* Thread */ Thread;
            /**
             * Chat.properties
             */
            properties: /* ChatProperties */ ChatProperties;
            /**
             * Chat.access
             */
            access: /* Access */ Access;
            /**
             * Chat.is_followed
             */
            is_followed: boolean;
        }
        /**
         * ChatDurationReport
         */
        export interface ChatDurationReport {
            /**
             * ChatDurationReport.name
             */
            name: string;
            /**
             * ChatDurationReport.request
             */
            request: /* DurationRequest */ DurationRequest;
            /**
             * ChatDurationReport.total
             */
            total: number;
            /**
             * ChatDurationReport.records
             */
            records: {
                [name: string]: /* DurationRecord */ DurationRecord;
            };
        }
        /**
         * ChatProperties
         */
        export interface ChatProperties {
            /**
             * ChatProperties.routing
             */
            routing: /* PurpleRouting */ PurpleRouting;
            /**
             * ChatProperties.source
             */
            source: /* PurpleSource */ PurpleSource;
            /**
             * ChatProperties.supervising
             */
            supervising: /* Supervising */ Supervising;
        }
        /**
         * ChatsSatisfactionReport
         */
        export interface ChatsSatisfactionReport {
            /**
             * ChatsSatisfactionReport.name
             */
            name: string;
            /**
             * ChatsSatisfactionReport.request
             */
            request: {
                /**
                 * ChatsSatisfactionReport.request.distribution
                 */
                distribution: "day" | "month" | "hour" | "day-hours" | "year";
                /**
                 * ChatsSatisfactionReport.request.timezone
                 */
                timezone: string;
                /**
                 * ChatsSatisfactionReport.request.filters
                 */
                filters: /* RatingsFilters */ RatingsFilters;
            };
            /**
             * ChatsSatisfactionReport.total
             */
            total: number;
            /**
             * ChatsSatisfactionReport.records
             */
            records: {
                [name: string]: /* RatingsRecord */ RatingsRecord;
            };
        }
        /**
         * Child
         */
        export interface Child {
            /**
             * Child.text
             */
            text?: string;
            /**
             * Child.type
             */
            type?: string;
            /**
             * Child.children
             */
            children?: null;
        }
        /**
         * CodeGrantResponse
         */
        export interface CodeGrantResponse {
            /**
             * CodeGrantResponse.access_token
             */
            access_token: string;
            /**
             * CodeGrantResponse.account_id
             */
            account_id: string;
            /**
             * CodeGrantResponse.expires_in
             */
            expires_in: number;
            /**
             * CodeGrantResponse.license_id
             */
            license_id: /* CodeGrantResponse.license_id */ string | number;
            /**
             * CodeGrantResponse.organization_id
             */
            organization_id: string;
            /**
             * CodeGrantResponse.refresh_token
             */
            refresh_token: string;
            /**
             * CodeGrantResponse.scope
             */
            scope: string;
            /**
             * CodeGrantResponse.token_type
             */
            token_type: string;
        }
        export interface Contact {
            id?: string;
            name?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            CustomerId?: string;
            email?: string | null;
            phone?: string | null;
            role?: string | null;
            notes?: string | null;
        }
        export interface CronJob {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            name?: string;
            description?: string;
            enabled?: boolean;
            schedule?: string;
        }
        /**
         * CustomVariable
         */
        export interface CustomVariable {
            /**
             * CustomVariable.key
             */
            key: string;
            /**
             * CustomVariable.value
             */
            value: string;
        }
        export interface Customer {
            id?: string;
            name?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            website?: string | null;
            email?: string | null;
        }
        export interface CustomerNotes {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            CustomerId?: string;
            text?: string;
            attachments?: string[];
        }
        export interface DashboardDetails {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            organizationId?: string;
            appSlug?: string;
            whiteLabelImage?: string | null;
            whiteLabelDomain?: string | null;
            domainRequestChangeStatus?: "IDLE" | "PENDING" | "COMPLETED";
            hasWhiteLabel?: boolean;
            whiteLabelValidUntil?: string | null; // date-time
        }
        export interface DashboardFilter {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            name?: string;
            userId?: string;
            lastDates?: "LAST_7_DAYS" | "LAST_30_DAYS";
            from?: string | null; // date-time
            to?: string | null; // date-time
            agents?: string[];
            tags?: string[];
            groups?: number[];
            rating?: number | null;
            tagsMode?: "ALL" | "ANY" | "EXCLUDE";
        }
        export interface DashboardSession {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            userId?: string;
            expiresAt?: string; // date-time
            token?: string;
        }
        export interface DashboardUser {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            detailsId?: string;
            email?: string;
            password?: string | null;
            groups?: number[];
            name?: string | null;
        }
        /**
         * DurationFilters
         */
        export interface DurationFilters {
            /**
             * DurationFilters.from
             */
            from: string;
            /**
             * DurationFilters.to
             */
            to: string;
            /**
             * DurationFilters.groups
             */
            groups?: {
                /**
                 * DurationFilters.groups.values
                 */
                values: number[];
            };
        }
        /**
         * DurationRecord
         */
        export interface DurationRecord {
            /**
             * DurationRecord.agents_chatting_duration
             */
            agents_chatting_duration?: number;
            /**
             * DurationRecord.count
             */
            count?: number;
            /**
             * DurationRecord.duration
             */
            duration?: number;
        }
        /**
         * DurationRequest
         */
        export interface DurationRequest {
            /**
             * DurationRequest.distribution
             */
            distribution: "day" | "month" | "hour" | "day-hours" | "year";
            /**
             * DurationRequest.timezone
             */
            timezone: string;
            /**
             * DurationRequest.filters
             */
            filters: /* DurationFilters */ DurationFilters;
        }
        /**
         * Element
         */
        export interface Element {
            /**
             * Element.title
             */
            title: string;
            /**
             * Element.buttons
             */
            buttons: /* Button */ Button[];
            /**
             * Element.subtitle
             */
            subtitle?: string;
            /**
             * Element.image
             */
            image?: /* Image */ Image;
        }
        /**
         * EngagementFilters
         */
        export interface EngagementFilters {
            /**
             * EngagementFilters.from
             */
            from: string;
            /**
             * EngagementFilters.to
             */
            to: string;
            /**
             * EngagementFilters.groups
             */
            groups?: {
                /**
                 * EngagementFilters.groups.values
                 */
                values: number[];
            };
            /**
             * EngagementFilters.agents
             */
            agents?: {
                /**
                 * EngagementFilters.agents.values
                 */
                values: string[];
            };
            /**
             * EngagementFilters.tags
             */
            tags?: {
                /**
                 * EngagementFilters.tags.values
                 */
                values: string[];
            };
        }
        /**
         * EngagementRecord
         */
        export interface EngagementRecord {
            /**
             * started_by_agent
             */
            started_by_agent?: number;
            /**
             * started_by_customer_from_greeting
             */
            started_by_customer_from_greeting?: number;
            /**
             * started_by_customer_without_greeting
             */
            started_by_customer_without_greeting?: number;
        }
        /**
         * EngagementReport
         */
        export interface EngagementReport {
            /**
             * EngagementReport.name
             */
            name: string;
            /**
             * EngagementReport.request
             */
            request: {
                /**
                 * EngagementReport.request.distribution
                 */
                distribution: "hour" | "day" | "day-hours" | "month" | "year";
                /**
                 * EngagementReport.request.timezone
                 */
                timezone: string;
                /**
                 * EngagementReport.request.filters
                 */
                filters: /* EngagementFilters */ EngagementFilters;
            };
            /**
             * EngagementReport.total
             */
            total: number;
            /**
             * EngagementReport.records
             */
            records: {
                [name: string]: /* EngagementRecord */ EngagementRecord;
            };
        }
        /**
         * Event
         */
        export interface Event {
            /**
             * Event.id
             */
            id: string;
            /**
             * Event.created_at
             */
            created_at: any;
            /**
             * Event.visibility
             */
            visibility: any;
            /**
             * Event.type
             */
            type: any;
            /**
             * Event.properties
             */
            properties?: /* EventProperties */ EventProperties;
            /**
             * Event.text
             */
            text?: string;
            /**
             * Event.author_id
             */
            author_id?: string;
            /**
             * Event.custom_id
             */
            custom_id?: string;
            /**
             * Event.template_id
             */
            template_id?: any;
            /**
             * Event.elements
             */
            elements?: /* Element */ Element[];
            /**
             * Event.system_message_type
             */
            system_message_type?: any;
            /**
             * Event.text_vars
             */
            text_vars?: /* TextVars */ TextVars;
            /**
             * Event.form_id
             */
            form_id?: string;
            /**
             * Event.form_type
             */
            form_type?: string;
            /**
             * Event.fields
             */
            fields?: /* Field */ Field[];
        }
        /**
         * EventProperties
         */
        export interface EventProperties {
            /**
             * EventProperties.source
             */
            source?: /* FluffySource */ FluffySource;
            /**
             * EventProperties.lc2
             */
            lc2?: /* Lc2 */ Lc2;
            /**
             * EventProperties.translation
             */
            translation?: {
                /**
                 * EventProperties.translation.target_message
                 */
                target_message: string;
            };
        }
        /**
         * Field
         */
        export interface Field {
            /**
             * Field.id
             */
            id: string;
            /**
             * Field.type
             */
            type: string;
            /**
             * Field.label
             */
            label: string;
            /**
             * Field.answer
             */
            answer?: string;
            /**
             * Field.answers
             */
            answers?: /* Answer */ Answer[];
        }
        /**
         * FirstResponseTimeFilters
         */
        export interface FirstResponseTimeFilters {
            /**
             * FirstResponseTimeFilters.from
             */
            from: string;
            /**
             * FirstResponseTimeFilters.to
             */
            to: string;
            /**
             * FirstResponseTimeFilters.groups
             */
            groups?: {
                /**
                 * FirstResponseTimeFilters.groups.values
                 */
                values: number[];
            };
            /**
             * FirstResponseTimeFilters.agents
             */
            agents?: {
                /**
                 * FirstResponseTimeFilters.agents.values
                 */
                values: string[];
            };
            /**
             * FirstResponseTimeFilters.tags
             */
            tags?: {
                /**
                 * FirstResponseTimeFilters.tags.values
                 */
                values: string[];
            };
        }
        /**
         * FirstResponseTimeRecord
         */
        export interface FirstResponseTimeRecord {
            /**
             * FirstResponseTimeRecord.count
             */
            count: number;
            /**
             * FirstResponseTimeRecord.first_response_time
             */
            first_response_time: number;
        }
        /**
         * FirstResponseTimeReport
         */
        export interface FirstResponseTimeReport {
            /**
             * FirstResponseTimeReport.name
             */
            name: string;
            /**
             * FirstResponseTimeReport.request
             */
            request: /* FirstResponseTimeRequest */ FirstResponseTimeRequest;
            /**
             * FirstResponseTimeReport.total
             */
            total: number;
            /**
             * FirstResponseTimeReport.records
             */
            records: {
                [name: string]: /* FirstResponseTimeRecord */ FirstResponseTimeRecord;
            };
        }
        /**
         * FirstResponseTimeRequest
         */
        export interface FirstResponseTimeRequest {
            /**
             * FirstResponseTimeRequest.distribution
             */
            distribution: "day" | "month" | "hour" | "day-hours" | "year";
            /**
             * FirstResponseTimeRequest.timezone
             */
            timezone: string;
            /**
             * FirstResponseTimeRequest.filters
             */
            filters: /* FirstResponseTimeFilters */ FirstResponseTimeFilters;
        }
        /**
         * Flags
         */
        export interface Flags {
            /**
             * Flags.visitedWelcomeTutorial
             */
            visitedWelcomeTutorial: boolean;
        }
        /**
         * FluffyRouting
         */
        export interface FluffyRouting {
            /**
             * FluffyRouting.continuous
             */
            continuous: boolean;
            /**
             * FluffyRouting.group_status_at_start
             */
            group_status_at_start: any;
            /**
             * FluffyRouting.idle
             */
            idle: boolean;
            /**
             * FluffyRouting.pinned
             */
            pinned: boolean;
            /**
             * FluffyRouting.start_url
             */
            start_url: string;
            /**
             * FluffyRouting.unassigned
             */
            unassigned: boolean;
            /**
             * FluffyRouting.referrer
             */
            referrer?: string;
        }
        /**
         * FluffySource
         */
        export interface FluffySource {
            /**
             * FluffySource.client_id
             */
            client_id: string;
        }
        /**
         * Geolocation
         */
        export interface Geolocation {
            /**
             * Geolocation.country
             */
            country: string;
            /**
             * Geolocation.country_code
             */
            country_code: string;
            /**
             * Geolocation.region
             */
            region?: string;
            /**
             * Geolocation.city
             */
            city?: string;
            /**
             * Geolocation.timezone
             */
            timezone: string;
            /**
             * Geolocation.latitude
             */
            latitude: string;
            /**
             * Geolocation.longitude
             */
            longitude: string;
        }
        /**
         * HelpDeskListAgentsResponse
         */
        export interface HelpDeskListAgentsResponse {
            /**
             * HelpDeskListAgentsResponse.ID
             */
            ID: string;
            /**
             * HelpDeskListAgentsResponse.licenseID
             */
            licenseID: number;
            /**
             * HelpDeskListAgentsResponse.createdAt
             */
            createdAt: any;
            /**
             * HelpDeskListAgentsResponse.createdBy
             */
            createdBy: string;
            /**
             * HelpDeskListAgentsResponse.createdByType
             */
            createdByType: string;
            /**
             * HelpDeskListAgentsResponse.updatedAt
             */
            updatedAt: any;
            /**
             * HelpDeskListAgentsResponse.updatedBy
             */
            updatedBy: string;
            /**
             * HelpDeskListAgentsResponse.roles
             */
            roles: string[];
            /**
             * HelpDeskListAgentsResponse.teamIDs
             */
            teamIDs: string[];
            /**
             * HelpDeskListAgentsResponse.email
             */
            email: string;
            /**
             * HelpDeskListAgentsResponse.name
             */
            name: string;
            /**
             * HelpDeskListAgentsResponse.status
             */
            status: string;
            /**
             * HelpDeskListAgentsResponse.avatar
             */
            avatar: string;
            /**
             * HelpDeskListAgentsResponse.jobTitle
             */
            jobTitle: null;
            /**
             * HelpDeskListAgentsResponse.flags
             */
            flags: /* Flags */ Flags;
            /**
             * HelpDeskListAgentsResponse.settings
             */
            settings: /* Settings */ Settings;
            /**
             * HelpDeskListAgentsResponse.signature
             */
            signature: /* Signature */ Signature;
        }
        /**
         * Image
         */
        export interface Image {
            /**
             * Image.url
             */
            url: string;
        }
        /**
         * LastPage
         */
        export interface LastPage {
            /**
             * LastPage.opened_at
             */
            opened_at: any;
            /**
             * LastPage.url
             */
            url: string;
            /**
             * LastPage.title
             */
            title: string;
        }
        /**
         * LastVisit
         */
        export interface LastVisit {
            /**
             * LastVisit.id
             */
            id: number;
            /**
             * LastVisit.started_at
             */
            started_at: any;
            /**
             * LastVisit.ended_at
             */
            ended_at?: any;
            /**
             * LastVisit.ip
             */
            ip: string;
            /**
             * LastVisit.user_agent
             */
            user_agent: string;
            /**
             * LastVisit.geolocation
             */
            geolocation: /* Geolocation */ Geolocation;
            /**
             * LastVisit.last_pages
             */
            last_pages: /* LastPage */ LastPage[];
        }
        /**
         * Lc2
         */
        export interface Lc2 {
            /**
             * Lc2.welcome_message
             */
            welcome_message?: boolean;
            /**
             * Lc2.form_type
             */
            form_type?: string;
        }
        /**
         * ListArchivesPayload
         */
        export interface ListArchivesPayload {
            /**
             * ListArchivesPayload.chats
             */
            chats: /* Chat */ Chat[];
            /**
             * ListArchivesPayload.found_chats
             */
            found_chats: number;
            /**
             * ListArchivesPayload.next_page_id
             */
            next_page_id: string;
            /**
             * ListArchivesPayload.previous_page_id
             */
            previous_page_id: string;
        }
        /**
         * ListBotsPayload
         */
        export interface ListBotsPayload {
            /**
             * ListBotsPayload.avatar
             */
            avatar?: string;
            /**
             * ListBotsPayload.default_group_priority
             */
            default_group_priority: string;
            /**
             * ListBotsPayload.groups
             */
            groups: {
                /**
                 * ListBotsPayload.groups.[].id
                 */
                id: number;
                /**
                 * ListBotsPayload.groups.[].priority
                 */
                priority: string;
            }[];
            /**
             * ListBotsPayload.id
             */
            id: string;
            /**
             * ListBotsPayload.name
             */
            name: string;
            /**
             * ListBotsPayload.owner_client_id
             */
            owner_client_id: string;
        }
        /**
         * ListTagsPayload.[]
         */
        export type ListTagsPayload = /* TagPayload */ TagPayload[];
        /**
         * LiveChatAccountInfoResponse
         */
        export interface LiveChatAccountInfoResponse {
            /**
             * LiveChatAccountInfoResponse.access_token
             */
            access_token: string;
            /**
             * LiveChatAccountInfoResponse.account_id
             */
            account_id: string;
            /**
             * LiveChatAccountInfoResponse.client_id
             */
            client_id: string;
            /**
             * LiveChatAccountInfoResponse.entity_id
             */
            entity_id: string;
            /**
             * LiveChatAccountInfoResponse.expires_in
             */
            expires_in: number;
            /**
             * LiveChatAccountInfoResponse.license_id
             */
            license_id: number;
            /**
             * LiveChatAccountInfoResponse.organization_id
             */
            organization_id: string;
            /**
             * LiveChatAccountInfoResponse.scope
             */
            scope: string;
            /**
             * LiveChatAccountInfoResponse.token_type
             */
            token_type: string;
        }
        /**
         * LiveChatListAgentsResponse
         */
        export interface LiveChatListAgentsResponse {
            /**
             * LiveChatListAgentsResponse.account_id
             */
            account_id: string;
            /**
             * LiveChatListAgentsResponse.avatar
             */
            avatar: string;
            /**
             * LiveChatListAgentsResponse.email_subscriptions
             */
            email_subscriptions: any[];
            /**
             * LiveChatListAgentsResponse.id
             */
            id: string;
            /**
             * LiveChatListAgentsResponse.job_title
             */
            job_title: string;
            /**
             * LiveChatListAgentsResponse.last_logout
             */
            last_logout?: any;
            /**
             * LiveChatListAgentsResponse.login_status
             */
            login_status: any;
            /**
             * LiveChatListAgentsResponse.max_chats_count
             */
            max_chats_count: number;
            /**
             * LiveChatListAgentsResponse.name
             */
            name: string;
            /**
             * LiveChatListAgentsResponse.role
             */
            role: any;
            /**
             * LiveChatListAgentsResponse.suspended
             */
            suspended: boolean;
            /**
             * LiveChatListAgentsResponse.groups
             */
            groups: {
                /**
                 * LiveChatListAgentsResponse.groups.[].id
                 */
                id: number;
                /**
                 * LiveChatListAgentsResponse.groups.[].priority
                 */
                priority: string;
            }[];
        }
        export interface Meeting {
            id?: string;
            name?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            type?: "ONLINE" | "OFFLINE";
            link?: string | null;
            notes?: string | null;
            CustomerId?: string;
            from?: string; // date-time
            to?: string; // date-time
        }
        export interface Message {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            eventID?: string;
            chatID?: string;
            threadID?: string;
            organizationID?: string;
        }
        /**
         * MissedChatsFilters
         */
        export interface MissedChatsFilters {
            /**
             * MissedChatsFilters.from
             */
            from: string;
            /**
             * MissedChatsFilters.to
             */
            to: string;
            /**
             * MissedChatsFilters.timezone
             */
            timezone?: string;
            /**
             * MissedChatsFilters.groups
             */
            groups?: {
                /**
                 * MissedChatsFilters.groups.values
                 */
                values: number[];
            };
            /**
             * MissedChatsFilters.agents
             */
            agents?: {
                /**
                 * MissedChatsFilters.agents.values
                 */
                values: string[];
            };
            /**
             * MissedChatsFilters.tags
             */
            tags?: {
                /**
                 * MissedChatsFilters.tags.values
                 */
                values: string[];
            };
            /**
             * MissedChatsFilters.properties
             */
            properties?: {
                /**
                 * MissedChatsFilters.properties.routing
                 */
                routing?: {
                    /**
                     * MissedChatsFilters.properties.routing.unreplied
                     */
                    unreplied?: {
                        /**
                         * MissedChatsFilters.properties.routing.unreplied.values
                         */
                        values: boolean[];
                    };
                };
            };
        }
        /**
         * MissedChatsRecord
         */
        export interface MissedChatsRecord {
            /**
             * total
             */
            total?: number;
            /**
             * continuous
             */
            continuous?: number;
        }
        /**
         * MissedChatsReport
         */
        export interface MissedChatsReport {
            /**
             * MissedChatsReport.name
             */
            name: string;
            /**
             * MissedChatsReport.request
             */
            request: {
                /**
                 * MissedChatsReport.request.distribution
                 */
                distribution: "day" | "hour" | "day-hours" | "month" | "year";
                /**
                 * MissedChatsReport.request.timezone
                 */
                timezone: string;
                /**
                 * MissedChatsReport.request.filters
                 */
                filters: /* MissedChatsFilters */ MissedChatsFilters;
            };
            /**
             * MissedChatsReport.total
             */
            total: number;
            /**
             * MissedChatsReport.records
             */
            records: {
                [name: string]: /* MissedChatsRecord */ MissedChatsRecord;
            };
        }
        export interface Organization {
            id?: string;
            organizationID?: string;
            ownerEmail?: string | null;
            source?: "HD" | "LC";
            LicenceID?: number | null;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            appId?: string | null;
            translatorDetailsId?: string | null;
            appOrganizationAuthId?: string | null;
            customerID?: string | null;
        }
        /**
         * PerformanceAgentRecord
         */
        export interface PerformanceAgentRecord {
            /**
             * PerformanceAgentRecord.accepting_chats_time
             */
            accepting_chats_time?: number;
            /**
             * PerformanceAgentRecord.chatting_time
             */
            chatting_time?: number;
            /**
             * PerformanceAgentRecord.logged_in_time
             */
            logged_in_time: number;
            /**
             * PerformanceAgentRecord.not_accepting_chats_time
             */
            not_accepting_chats_time: number;
            /**
             * PerformanceAgentRecord.chats_count
             */
            chats_count?: number;
            /**
             * PerformanceAgentRecord.chats_rated_bad
             */
            chats_rated_bad?: number;
            /**
             * PerformanceAgentRecord.chats_rated_good
             */
            chats_rated_good?: number;
            /**
             * PerformanceAgentRecord.first_response_chats_count
             */
            first_response_chats_count?: number;
            /**
             * PerformanceAgentRecord.first_response_time
             */
            first_response_time?: number;
        }
        /**
         * PerformanceFilters
         */
        export interface PerformanceFilters {
            /**
             * PerformanceFilters.from
             */
            from: string;
            /**
             * PerformanceFilters.to
             */
            to: string;
            /**
             * PerformanceFilters.groups
             */
            groups?: {
                /**
                 * PerformanceFilters.groups.values
                 */
                values: number[];
            };
        }
        /**
         * PerformanceRequest
         */
        export interface PerformanceRequest {
            /**
             * PerformanceRequest.distribution
             */
            distribution: "hour" | "day" | "day-hours" | "month" | "year";
            /**
             * PerformanceRequest.timezone
             */
            timezone: string;
            /**
             * PerformanceRequest.filters
             */
            filters: /* PerformanceFilters */ PerformanceFilters;
        }
        /**
         * PerformanceSummary
         */
        export interface PerformanceSummary {
            /**
             * PerformanceSummary.chats_count
             */
            chats_count: number;
            /**
             * PerformanceSummary.chats_rated_bad
             */
            chats_rated_bad: number;
            /**
             * PerformanceSummary.chats_rated_good
             */
            chats_rated_good: number;
            /**
             * PerformanceSummary.first_response_chats_count
             */
            first_response_chats_count: number;
            /**
             * PerformanceSummary.first_response_time
             */
            first_response_time: number;
        }
        /**
         * PurpleRouting
         */
        export interface PurpleRouting {
            /**
             * PurpleRouting.continuous
             */
            continuous: boolean;
            /**
             * PurpleRouting.email_follow_up
             */
            email_follow_up: boolean;
            /**
             * PurpleRouting.pinned
             */
            pinned: boolean;
            /**
             * PurpleRouting.was_pinned
             */
            was_pinned: boolean;
        }
        /**
         * PurpleSource
         */
        export interface PurpleSource {
            /**
             * PurpleSource.client_id
             */
            client_id: string;
            /**
             * PurpleSource.customer_client_id
             */
            customer_client_id: string;
        }
        /**
         * RatingsFilters
         */
        export interface RatingsFilters {
            /**
             * RatingsFilters.from
             */
            from: string;
            /**
             * RatingsFilters.to
             */
            to: string;
            /**
             * RatingsFilters.agents
             */
            agents?: {
                /**
                 * RatingsFilters.agents.values
                 */
                values: string[];
            };
        }
        /**
         * RatingsRecord
         */
        export interface RatingsRecord {
            /**
             * RatingsRecord.chats
             */
            chats: number;
            /**
             * RatingsRecord.good
             */
            good?: number;
            /**
             * RatingsRecord.bad
             */
            bad?: number;
        }
        /**
         * ResponseTimeFilters
         */
        export interface ResponseTimeFilters {
            /**
             * ResponseTimeFilters.from
             */
            from: string;
            /**
             * ResponseTimeFilters.to
             */
            to: string;
            /**
             * ResponseTimeFilters.groups
             */
            groups?: {
                /**
                 * ResponseTimeFilters.groups.values
                 */
                values: number[];
            };
            /**
             * ResponseTimeFilters.agents
             */
            agents?: {
                /**
                 * ResponseTimeFilters.agents.values
                 */
                values: string[];
            };
            /**
             * ResponseTimeFilters.tags
             */
            tags?: {
                /**
                 * ResponseTimeFilters.tags.values
                 */
                values: string[];
            };
        }
        /**
         * ResponseTimeRecord
         */
        export interface ResponseTimeRecord {
            /**
             * ResponseTimeRecord.count
             */
            count: number;
            /**
             * ResponseTimeRecord.response_time
             */
            response_time: number;
        }
        /**
         * ResponseTimeReport
         */
        export interface ResponseTimeReport {
            /**
             * ResponseTimeReport.name
             */
            name: string;
            /**
             * ResponseTimeReport.request
             */
            request: /* ResponseTimeRequest */ ResponseTimeRequest;
            /**
             * ResponseTimeReport.total
             */
            total: number;
            /**
             * ResponseTimeReport.records
             */
            records: {
                [name: string]: /* ResponseTimeRecord */ ResponseTimeRecord;
            };
        }
        /**
         * ResponseTimeRequest
         */
        export interface ResponseTimeRequest {
            /**
             * ResponseTimeRequest.distribution
             */
            distribution: "day" | "month" | "hour" | "day-hours" | "year";
            /**
             * ResponseTimeRequest.timezone
             */
            timezone: string;
            /**
             * ResponseTimeRequest.filters
             */
            filters: /* ResponseTimeFilters */ ResponseTimeFilters;
        }
        /**
         * RichTextObj
         */
        export interface RichTextObj {
            /**
             * RichTextObj.type
             */
            type?: string;
            /**
             * RichTextObj.children
             */
            children?: /* Child */ Child[];
        }
        export interface Role {
            id?: string;
            name?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
        }
        export interface RoleOnUser {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            UserId?: string;
            RoleId?: string;
        }
        export interface Scope {
            id?: string;
            name?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
        }
        export interface ScopeOnRole {
            id?: string;
            RoleId?: string;
            ScopeId?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
        }
        /**
         * Settings
         */
        export interface Settings {
            /**
             * Settings.emailNotificationsActive
             */
            emailNotificationsActive: boolean;
            /**
             * Settings.webpushNotificationsActive
             */
            webpushNotificationsActive: string;
        }
        /**
         * Signature
         */
        export interface Signature {
            /**
             * Signature.text
             */
            text: string;
            /**
             * Signature.richTextObj
             */
            richTextObj: /* RichTextObj */ RichTextObj[];
            /**
             * Signature.attachments
             */
            attachments: /* Attachment */ Attachment[];
        }
        /**
         * Statistics
         */
        export interface Statistics {
            /**
             * Statistics.chats_count
             */
            chats_count: number;
            /**
             * Statistics.threads_count
             */
            threads_count: number;
            /**
             * Statistics.visits_count
             */
            visits_count: number;
            /**
             * Statistics.page_views_count
             */
            page_views_count: number;
            /**
             * Statistics.greetings_shown_count
             */
            greetings_shown_count: number;
            /**
             * Statistics.greetings_accepted_count
             */
            greetings_accepted_count: number;
        }
        /**
         * Supervising
         */
        export interface Supervising {
            /**
             * Supervising.agent_ids
             */
            agent_ids: string;
        }
        /**
         * TagPayload
         */
        export interface TagPayload {
            /**
             * TagPayload.name
             */
            name: string;
            /**
             * TagPayload.group_ids
             */
            group_ids: number[];
            /**
             * TagPayload.author_id
             */
            author_id: string;
            /**
             * TagPayload.created_at
             */
            created_at: string;
        }
        /**
         * TagsUsageReport
         */
        export interface TagsUsageReport {
            /**
             * TagsUsageReport.name
             */
            name: string;
            /**
             * TagsUsageReport.request
             */
            request: {
                /**
                 * TagsUsageReport.request.distribution
                 */
                distribution: "day" | "hour" | "day-hours" | "month" | "year";
                /**
                 * TagsUsageReport.request.timezone
                 */
                timezone: string;
                /**
                 * TagsUsageReport.request.filters
                 */
                filters: {
                    /**
                     * TagsUsageReport.request.filters.from
                     */
                    from: string;
                    /**
                     * TagsUsageReport.request.filters.to
                     */
                    to: string;
                    /**
                     * TagsUsageReport.request.filters.properties
                     */
                    properties?: {
                        /**
                         * TagsUsageReport.request.filters.properties.routing
                         */
                        routing?: {
                            /**
                             * TagsUsageReport.request.filters.properties.routing.offline_message
                             */
                            offline_message?: {
                                /**
                                 * TagsUsageReport.request.filters.properties.routing.offline_message.exists
                                 */
                                exists?: boolean;
                            };
                        };
                    };
                    /**
                     * TagsUsageReport.request.filters.tags
                     */
                    tags?: {
                        /**
                         * TagsUsageReport.request.filters.tags.exists
                         */
                        exists?: boolean;
                        /**
                         * TagsUsageReport.request.filters.tags.values
                         */
                        values?: string[];
                        /**
                         * TagsUsageReport.request.filters.tags.require_every_value
                         */
                        require_every_value?: boolean;
                    };
                    /**
                     * TagsUsageReport.request.filters.agents
                     */
                    agents?: {
                        /**
                         * TagsUsageReport.request.filters.agents.values
                         */
                        values: string[];
                    };
                };
            };
            /**
             * TagsUsageReport.total
             */
            total: number;
            /**
             * TagsUsageReport.records
             */
            records: {
                [name: string]: {
                    [name: string]: number;
                };
            };
        }
        /**
         * TestInterface
         */
        export interface TestInterface {
            /**
             * TestInterface.name
             */
            name: string;
            /**
             * TestInterface.age
             */
            age: number;
        }
        /**
         * TextVars
         */
        export interface TextVars {
            /**
             * TextVars.customer
             */
            customer: string;
        }
        /**
         * Thread
         */
        export interface Thread {
            /**
             * Thread.id
             */
            id: string;
            /**
             * Thread.active
             */
            active: boolean;
            /**
             * Thread.user_ids
             */
            user_ids: string[];
            /**
             * Thread.properties
             */
            properties: /* ThreadProperties */ ThreadProperties;
            /**
             * Thread.access
             */
            access: /* Access */ Access;
            /**
             * Thread.tags
             */
            tags: string[];
            /**
             * Thread.previous_thread_id
             */
            previous_thread_id?: string;
            /**
             * Thread.previous_accessible_thread_id
             */
            previous_accessible_thread_id?: string;
            /**
             * Thread.created_at
             */
            created_at: any;
            /**
             * Thread.events
             */
            events: /* Event */ Event[];
            /**
             * Thread.custom_variables
             */
            custom_variables?: /* CustomVariable */ CustomVariable[];
            /**
             * Thread.next_thread_id
             */
            next_thread_id?: string;
            /**
             * Thread.next_accessible_thread_id
             */
            next_accessible_thread_id?: string;
        }
        /**
         * ThreadProperties
         */
        export interface ThreadProperties {
            /**
             * ThreadProperties.a9a8be53909cf4133d06aa7d49329cd7
             */
            a9a8be53909cf4133d06aa7d49329cd7?: /* A9A8Be53909Cf4133D06Aa7D49329Cd7 */ A9A8Be53909Cf4133D06Aa7D49329Cd7;
            /**
             * ThreadProperties.routing
             */
            routing: /* FluffyRouting */ FluffyRouting;
            /**
             * ThreadProperties.source
             */
            source: /* PurpleSource */ PurpleSource;
            /**
             * ThreadProperties.rating
             */
            rating?: {
                /**
                 * ThreadProperties.rating.comment
                 */
                comment?: string;
                /**
                 * ThreadProperties.rating.score
                 */
                score?: number;
            };
        }
        export interface Ticket {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            externalId?: string;
            organizationID?: string;
        }
        export interface TicketEvent {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            ticketExternalId?: string;
            externalEventId?: string;
        }
        /**
         * TotalChatsFilters
         */
        export interface TotalChatsFilters {
            /**
             * TotalChatsFilters.from
             */
            from: string;
            /**
             * TotalChatsFilters.to
             */
            to: string;
            /**
             * TotalChatsFilters.groups
             */
            groups?: {
                /**
                 * TotalChatsFilters.groups.values
                 */
                values: number[];
            };
        }
        /**
         * TotalChatsRecord
         */
        export interface TotalChatsRecord {
            /**
             * total
             */
            total?: number;
            /**
             * continuous
             */
            continuous?: number;
        }
        /**
         * TotalChatsReport
         */
        export interface TotalChatsReport {
            /**
             * TotalChatsReport.name
             */
            name: string;
            /**
             * TotalChatsReport.request
             */
            request: {
                /**
                 * TotalChatsReport.request.distribution
                 */
                distribution: "day" | "hour" | "day-hours" | "month" | "year";
                /**
                 * TotalChatsReport.request.timezone
                 */
                timezone: string;
                /**
                 * TotalChatsReport.request.filters
                 */
                filters: /* TotalChatsFilters */ TotalChatsFilters;
            };
            /**
             * TotalChatsReport.total
             */
            total: number;
            /**
             * TotalChatsReport.records
             */
            records: {
                [name: string]: /* TotalChatsRecord */ TotalChatsRecord;
            };
        }
        export interface TranslatorAgentMapping {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            characters?: number;
            detailsId?: string;
        }
        export interface TranslatorDetails {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            characters?: number;
            visitorLang?: string | null;
            agentLang?: string | null;
            preferFormal?: boolean;
            privateMode?: boolean;
            enabled?: boolean;
            continuousLanguageDetection?: boolean;
            profanityMask?: boolean;
            appSlug?: string;
            organizationID?: string;
        }
        export interface TranslatorGroupMapping {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            characters?: number;
            appSlug?: string;
            detailsId?: string;
        }
        export interface TranslatorUsage {
            id?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            characters?: number;
            detailsId?: string;
            eventID?: string;
            appSlug?: string;
        }
        /**
         * User
         */
        export interface User {
            /**
             * User.id
             */
            id: string;
            /**
             * User.name
             */
            name: string;
            /**
             * User.email
             */
            email?: string;
            /**
             * User.events_seen_up_to
             */
            events_seen_up_to: any;
            /**
             * User.type
             */
            type: any;
            /**
             * User.present
             */
            present: boolean;
            /**
             * User.created_at
             */
            created_at?: any;
            /**
             * User.last_visit
             */
            last_visit?: /* LastVisit */ LastVisit;
            /**
             * User.statistics
             */
            statistics?: /* Statistics */ Statistics;
            /**
             * User.agent_last_event_created_at
             */
            agent_last_event_created_at?: any;
            /**
             * User.customer_last_event_created_at
             */
            customer_last_event_created_at?: any;
            /**
             * User.email_verified
             */
            email_verified?: boolean;
            /**
             * User.avatar
             */
            avatar?: string;
            /**
             * User.visibility
             */
            visibility?: any;
        }
        export interface UserSession {
            id?: string;
            userAgent?: string;
            IP?: string;
            createdAt?: string; // date-time
            updatedAt?: string; // date-time
            expiresAt?: string; // date-time
            token?: string;
            UserId?: string;
        }
    }
}
declare namespace Paths {
    namespace Authenticate {
        namespace Responses {
            export interface $200 {
                success: boolean;
                cookie: string;
                cookieValue: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace CrmAdminDeleteRole {
        export interface RequestBody {
            id?: string;
        }
        namespace Responses {
            export interface $200 {
                status?: string;
                message?: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace CrmAdminDeleteScope {
        export interface RequestBody {
            id?: string;
        }
        namespace Responses {
            export interface $200 {
                status?: string;
                message?: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace CrmAdminListScopes {
        namespace Responses {
            export type $200 = Components.Schemas.Scope[];
        }
    }
    namespace CrmAdminListUsers {
        namespace Responses {
            export type $200 = {
                /**
                 * User.id
                 */
                id: string;
                /**
                 * User.name
                 */
                name: string;
                /**
                 * User.email
                 */
                email?: string;
                /**
                 * User.events_seen_up_to
                 */
                events_seen_up_to: any;
                /**
                 * User.type
                 */
                type: any;
                /**
                 * User.present
                 */
                present: boolean;
                /**
                 * User.created_at
                 */
                created_at?: any;
                last_visit?: /* LastVisit */ Components.Schemas.LastVisit;
                statistics?: /* Statistics */ Components.Schemas.Statistics;
                /**
                 * User.agent_last_event_created_at
                 */
                agent_last_event_created_at?: any;
                /**
                 * User.customer_last_event_created_at
                 */
                customer_last_event_created_at?: any;
                /**
                 * User.email_verified
                 */
                email_verified?: boolean;
                /**
                 * User.avatar
                 */
                avatar?: string;
                /**
                 * User.visibility
                 */
                visibility?: any;
                RoleOnUser: {
                    id?: string;
                    createdAt?: string; // date-time
                    updatedAt?: string; // date-time
                    UserId?: string;
                    RoleId?: string;
                    Role: Components.Schemas.Role;
                }[];
            }[];
        }
    }
    namespace CrmAdminUpsertRole {
        export interface RequestBody {
            id?: string;
            name?: string;
            scopes_ids?: string[];
        }
        namespace Responses {
            export interface $200 {
                status?: string;
                message?: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace CrmAdminUpsertScope {
        export interface RequestBody {
            id?: string;
            name?: string;
        }
        namespace Responses {
            export interface $200 {
                status?: string;
                message?: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace CrmAdminUpsertUser {
        export interface RequestBody {
            email: string;
            password: string;
        }
        namespace Responses {
            export interface $200 {
                status?: string;
                message?: string;
                session?: {
                    id: string;
                    token: string;
                    expiresAt: string;
                };
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace CrmAppsListAppKinds {
        namespace Responses {
            export type $200 = string[];
        }
    }
    namespace CrmAppsListApps {
        namespace Responses {
            export type $200 = Components.Schemas.App[];
        }
    }
    namespace CrmAppsUpsertApp {
        export interface RequestBody {
            id?: string;
            name?: string;
            description?: string;
            status?: string;
            source?: string;
            applicationKind?: "TRANSLATOR" | "SALESFORCE" | "JIRA" | "AUTOTAGS" | "AICRM" | "TWILIO" | "VISITOREDITOR" | "CUSTOMERIO" | "CHATSEXPORTER" | "LOGS" | "AGENTCHAT";
            externalID?: string;
            clientID?: string;
            slug?: string;
            clientSecret?: string;
            redirectURI?: string;
        }
        namespace Responses {
            export interface $200 {
                status?: string;
                message?: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace CrmAuthCreateApiKey {
        export interface RequestBody {
            name: string;
        }
        namespace Responses {
            export interface $200 {
                message?: string;
            }
        }
    }
    namespace CrmAuthDeactivateApiKey {
        export interface RequestBody {
            id: string;
        }
        namespace Responses {
            export interface $200 {
                message?: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace CrmAuthListApiKeys {
        namespace Responses {
            export type $200 = Components.Schemas.APIKey[];
        }
    }
    namespace CrmAuthListSessions {
        namespace Responses {
            export type $200 = Components.Schemas.UserSession[];
        }
    }
    namespace CrmAuthLogOut {
        export type RequestBody = any;
        namespace Responses {
            export interface $200 {
                status?: string;
                message?: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace CrmAuthLogin {
        export interface RequestBody {
            email: string;
            password: string;
        }
        namespace Responses {
            export interface $200 {
                status?: string;
                message?: string;
                session?: {
                    id: string;
                    token: string;
                    expiresAt: string;
                };
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace CrmAuthUpdatePassword {
        export interface RequestBody {
            newPassword?: string;
        }
        namespace Responses {
            export interface $200 {
                status?: string;
                message?: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace CrmAuthVerifyCrmToken {
        export type RequestBody = any;
        namespace Responses {
            /**
             * User
             */
            export interface $200 {
                /**
                 * User.id
                 */
                id: string;
                /**
                 * User.name
                 */
                name: string;
                /**
                 * User.email
                 */
                email?: string;
                /**
                 * User.events_seen_up_to
                 */
                events_seen_up_to: any;
                /**
                 * User.type
                 */
                type: any;
                /**
                 * User.present
                 */
                present: boolean;
                /**
                 * User.created_at
                 */
                created_at?: any;
                last_visit?: /* LastVisit */ Components.Schemas.LastVisit;
                statistics?: /* Statistics */ Components.Schemas.Statistics;
                /**
                 * User.agent_last_event_created_at
                 */
                agent_last_event_created_at?: any;
                /**
                 * User.customer_last_event_created_at
                 */
                customer_last_event_created_at?: any;
                /**
                 * User.email_verified
                 */
                email_verified?: boolean;
                /**
                 * User.avatar
                 */
                avatar?: string;
                /**
                 * User.visibility
                 */
                visibility?: any;
                roles?: {
                    id?: string;
                    name?: string;
                    createdAt?: string; // date-time
                    updatedAt?: string; // date-time
                    scopes?: Components.Schemas.Scope[];
                }[];
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace DashboardAppLogin {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            email: string;
            password: string;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
                cookie: string;
                cookieValue: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace DashboardDeleteUserFilter {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            id: string;
        }
        namespace Responses {
            export interface $200 {
                message?: string;
                status?: string;
            }
        }
    }
    namespace DashboardGetOrganizationDetails {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DashboardDetails;
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace DashboardListAgents {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        namespace Responses {
            export type $200 = /* LiveChatListAgentsResponse */ Components.Schemas.LiveChatListAgentsResponse[];
        }
    }
    namespace DashboardListArchives {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            limit?: number;
            from?: string;
            to?: string;
            agents?: string[];
            rating?: number;
            tags?: string[];
            group_ids?: number[];
            page_id?: string;
            query?: string;
            tagsMode?: string;
        }
        namespace Responses {
            export type $200 = /* ListArchivesPayload */ Components.Schemas.ListArchivesPayload;
        }
    }
    namespace DashboardListGroups {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        namespace Responses {
            export type $200 = {
                id?: number;
                name?: string;
            }[];
        }
    }
    namespace DashboardListUserFilters {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DashboardFilter[];
        }
    }
    namespace DashboardListUsers {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DashboardUser[];
        }
    }
    namespace DashboardLogOut {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        namespace Responses {
            export interface $200 {
                success?: boolean;
            }
        }
    }
    namespace DashboardReportsAgentPerformance {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            groups?: number[];
            from?: string;
            to?: string;
            distribution?: "hour" | "day" | "day-hours" | "month" | "year";
        }
        namespace Responses {
            export type $200 = /* AgentPerformanceReport */ Components.Schemas.AgentPerformanceReport;
        }
    }
    namespace DashboardReportsChatAvailability {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            agents?: string[];
            groups?: number[];
            from?: string;
            to?: string;
            distribution?: "hour" | "day";
        }
        namespace Responses {
            export type $200 = /* AvailabilityReport */ Components.Schemas.AvailabilityReport;
        }
    }
    namespace DashboardReportsChatDuration {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            agents?: string[];
            groups?: number[];
            tags?: string[];
            from?: string;
            to?: string;
            distribution?: "hour" | "day" | "day-hours" | "month" | "year";
            tagsMode?: string;
        }
        namespace Responses {
            export type $200 = /* ChatDurationReport */ Components.Schemas.ChatDurationReport;
        }
    }
    namespace DashboardReportsChatEngagement {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            agents?: string[];
            groups?: number[];
            tags?: string[];
            from?: string;
            to?: string;
            distribution?: "hour" | "day" | "day-hours" | "month" | "year";
            tagsMode?: string;
        }
        namespace Responses {
            export type $200 = /* EngagementReport */ Components.Schemas.EngagementReport;
        }
    }
    namespace DashboardReportsChatsSatisfaction {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            agents?: string[];
            groups?: number[];
            tags?: string[];
            from?: string;
            to?: string;
            distribution?: "hour" | "day" | "day-hours" | "month" | "year";
            tagsMode?: string;
        }
        namespace Responses {
            export type $200 = /* ChatsSatisfactionReport */ Components.Schemas.ChatsSatisfactionReport;
        }
    }
    namespace DashboardReportsDeleteUser {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            id: string;
        }
        namespace Responses {
            export interface $200 {
                message?: string;
                status?: string;
            }
        }
    }
    namespace DashboardReportsFirstResponseTime {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            groups?: number[];
            agents?: string[];
            from?: string;
            tags?: string[];
            to?: string;
            distribution?: "hour" | "day" | "day-hours" | "month" | "year";
            tagsMode?: string;
        }
        namespace Responses {
            export type $200 = /* FirstResponseTimeReport */ Components.Schemas.FirstResponseTimeReport;
        }
    }
    namespace DashboardReportsListTags {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            groups?: number[];
        }
        namespace Responses {
            export type $200 = /* ListTagsPayload.[] */ Components.Schemas.ListTagsPayload;
        }
    }
    namespace DashboardReportsMissedChats {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            agents?: string[];
            groups?: number[];
            tags?: string[];
            from?: string;
            to?: string;
            distribution?: "hour" | "day" | "day-hours" | "month" | "year";
            tagsMode?: string;
        }
        namespace Responses {
            export type $200 = /* TotalChatsReport */ Components.Schemas.TotalChatsReport;
        }
    }
    namespace DashboardReportsResponseTime {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            groups?: number[];
            tags?: string[];
            agents?: string[];
            from?: string;
            to?: string;
            distribution?: "hour" | "day" | "day-hours" | "month" | "year";
            tagsMode?: string;
        }
        namespace Responses {
            export type $200 = /* ResponseTimeReport */ Components.Schemas.ResponseTimeReport;
        }
    }
    namespace DashboardReportsTagsUsage {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            agents?: string[];
            groups?: number[];
            tags?: string[] | {
                exists?: boolean;
            };
            from?: string;
            to?: string;
            distribution?: "hour" | "day" | "day-hours" | "month" | "year";
            tagsMode?: string;
        }
        namespace Responses {
            export type $200 = /* TagsUsageReport */ Components.Schemas.TagsUsageReport;
        }
    }
    namespace DashboardReportsTotalChats {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            agents?: string[];
            groups?: number[];
            tags?: string[];
            from?: string;
            to?: string;
            distribution?: "hour" | "day" | "day-hours" | "month" | "year";
            tagsMode?: string;
        }
        namespace Responses {
            export type $200 = /* TotalChatsReport */ Components.Schemas.TotalChatsReport;
        }
    }
    namespace DashboardReportsUpsertUser {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            id?: string;
            email?: string;
            password?: string;
            groups?: number[];
            name?: string;
        }
        namespace Responses {
            export interface $200 {
                success?: boolean;
                message?: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace DashboardUpsertUserFilter {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            id?: string;
            name?: string;
            tags?: string[];
            agents?: string[];
            groups?: number[];
            lastDate?: string;
            from?: string;
            to?: string;
            rating?: number;
        }
        namespace Responses {
            export interface $200 {
                message?: string;
                status?: string;
            }
        }
    }
    namespace DashboardWhiteLabel {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            image_url: string;
            domain: string;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
            }
        }
    }
    namespace DashboardsGetOrganizationLogo {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            domain: string;
        }
        namespace Responses {
            export interface $200 {
                logoURL?: string;
            }
            export interface $404 {
                error?: string;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace GetAppDetails {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        namespace Responses {
            export interface $200 {
                clientID?: string;
            }
        }
    }
    namespace InstallLiveChatApp {
        namespace Parameters {
            export type AppSlug = string;
            export type Code = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface QueryParameters {
            code?: Parameters.Code;
        }
        namespace Responses {
            export interface $200 {
                success: boolean;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace ListGroups {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        namespace Responses {
            export type $200 = {
                id?: number;
                name?: string;
                routing_status?: string;
                language_code?: string;
            }[];
        }
    }
    namespace TranslatorsGetDetails {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TranslatorDetails;
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace TranslatorsUpdateDetails {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        export interface RequestBody {
            characters?: number;
            visitorLang?: string;
            agentLang?: string;
            preferFormal?: boolean;
            privateMode?: boolean;
            enabled?: boolean;
            continuousLanguageDetection?: boolean;
            profanityMask?: boolean;
        }
        namespace Responses {
            export interface $200 {
                success?: boolean;
            }
            export interface $500 {
                error: string;
                message: {
                    error_message: string;
                };
            }
        }
    }
    namespace VerifyDashboardToken {
        namespace Parameters {
            export type AppSlug = string;
        }
        export interface PathParameters {
            app_slug?: Parameters.AppSlug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DashboardDetails;
        }
    }
}


export interface OperationMethods {
  /**
   * crmAdminUpsertRole - Upsert Role
   * 
   * Upsert a CRM Role
   */
  'crmAdminUpsertRole'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAdminUpsertRole.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAdminUpsertRole.Responses.$200>
  /**
   * crmAdminListScopes - List Scopes
   * 
   * Lists Scopes.
   */
  'crmAdminListScopes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAdminListScopes.Responses.$200>
  /**
   * crmAdminDeleteRole - Delete Role
   * 
   * Delete a CRM Role
   */
  'crmAdminDeleteRole'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAdminDeleteRole.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAdminDeleteRole.Responses.$200>
  /**
   * crmAdminUpsertScope - Upsert Scope
   * 
   * Upsert a CRM Scope
   */
  'crmAdminUpsertScope'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAdminUpsertScope.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAdminUpsertScope.Responses.$200>
  /**
   * crmAdminDeleteScope - Delete Scope
   * 
   * Delete a CRM Scope
   */
  'crmAdminDeleteScope'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAdminDeleteScope.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAdminDeleteScope.Responses.$200>
  /**
   * crmAdminUpsertUser - Upsert User
   * 
   * Creates a CRM user
   */
  'crmAdminUpsertUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAdminUpsertUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAdminUpsertUser.Responses.$200>
  /**
   * crmAdminListUsers - List Users
   * 
   * Lists Users.
   */
  'crmAdminListUsers'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAdminListUsers.Responses.$200>
  /**
   * crmAppsListApps - List Apps
   * 
   * Lists Apps.
   */
  'crmAppsListApps'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAppsListApps.Responses.$200>
  /**
   * crmAppsListAppKinds - List App Kinds
   * 
   * Lists Applicatoin Kinds.
   */
  'crmAppsListAppKinds'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAppsListAppKinds.Responses.$200>
  /**
   * crmAppsUpsertApp - Upsert App
   * 
   * Upsert a CRM App
   */
  'crmAppsUpsertApp'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAppsUpsertApp.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAppsUpsertApp.Responses.$200>
  /**
   * crmAuthVerifyCrmToken - Verify Token
   * 
   * Checks if the user's token is valid
   */
  'crmAuthVerifyCrmToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAuthVerifyCrmToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAuthVerifyCrmToken.Responses.$200>
  /**
   * crmAuthUpdatePassword - Update Password
   * 
   * Updates the user's password.
   */
  'crmAuthUpdatePassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAuthUpdatePassword.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAuthUpdatePassword.Responses.$200>
  /**
   * crmAuthListSessions - List Sessions
   * 
   * Lists sessions.
   */
  'crmAuthListSessions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAuthListSessions.Responses.$200>
  /**
   * crmAuthLogOut - Log Out
   * 
   * Logs out from CRM
   */
  'crmAuthLogOut'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAuthLogOut.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAuthLogOut.Responses.$200>
  /**
   * crmAuthDeactivateApiKey - Deactivate API Key
   * 
   * Deactivates an API key.
   */
  'crmAuthDeactivateApiKey'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAuthDeactivateApiKey.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAuthDeactivateApiKey.Responses.$200>
  /**
   * crmAuthCreateApiKey - Create API Key
   * 
   * Creates a new API key for the CRM user.
   */
  'crmAuthCreateApiKey'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAuthCreateApiKey.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAuthCreateApiKey.Responses.$200>
  /**
   * crmAuthLogin - Log In
   * 
   * logins to CRM
   */
  'crmAuthLogin'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CrmAuthLogin.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAuthLogin.Responses.$200>
  /**
   * crmAuthListApiKeys - List API Keys
   * 
   * Lists API keys.
   */
  'crmAuthListApiKeys'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CrmAuthListApiKeys.Responses.$200>
  /**
   * TranslatorsUpdateDetails - Update Translator Details
   */
  'TranslatorsUpdateDetails'(
    parameters?: Parameters<Paths.TranslatorsUpdateDetails.PathParameters> | null,
    data?: Paths.TranslatorsUpdateDetails.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TranslatorsUpdateDetails.Responses.$200>
  /**
   * TranslatorsGetDetails - Get Translator Details
   */
  'TranslatorsGetDetails'(
    parameters?: Parameters<Paths.TranslatorsGetDetails.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TranslatorsGetDetails.Responses.$200>
  /**
   * DashboardListAgents - List Agents
   * 
   * Lists agents.
   */
  'DashboardListAgents'(
    parameters?: Parameters<Paths.DashboardListAgents.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardListAgents.Responses.$200>
  /**
   * dashboardLogOut - Log Out
   * 
   * Logs out from dashboard
   */
  'dashboardLogOut'(
    parameters?: Parameters<Paths.DashboardLogOut.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardLogOut.Responses.$200>
  /**
   * DashboardDeleteUserFilter - Delete user filters
   * 
   * Deletes user filters.
   */
  'DashboardDeleteUserFilter'(
    parameters?: Parameters<Paths.DashboardDeleteUserFilter.PathParameters> | null,
    data?: Paths.DashboardDeleteUserFilter.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardDeleteUserFilter.Responses.$200>
  /**
   * DashboardUpsertUserFilter - Upsert user filters
   * 
   * Upserts user filters.
   */
  'DashboardUpsertUserFilter'(
    parameters?: Parameters<Paths.DashboardUpsertUserFilter.PathParameters> | null,
    data?: Paths.DashboardUpsertUserFilter.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardUpsertUserFilter.Responses.$200>
  /**
   * DashboardListUserFilters - List user filters
   * 
   * Lists user filters.
   */
  'DashboardListUserFilters'(
    parameters?: Parameters<Paths.DashboardListUserFilters.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardListUserFilters.Responses.$200>
  /**
   * DashboardListGroups - List Groups
   * 
   * Lists groups.
   */
  'DashboardListGroups'(
    parameters?: Parameters<Paths.DashboardListGroups.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardListGroups.Responses.$200>
  /**
   * DashboardGetOrganizationDetails - Get Organization Details
   */
  'DashboardGetOrganizationDetails'(
    parameters?: Parameters<Paths.DashboardGetOrganizationDetails.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardGetOrganizationDetails.Responses.$200>
  /**
   * DashboardListArchives - List Archives
   */
  'DashboardListArchives'(
    parameters?: Parameters<Paths.DashboardListArchives.PathParameters> | null,
    data?: Paths.DashboardListArchives.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardListArchives.Responses.$200>
  /**
   * DashboardReportsDeleteUser - Delete User
   */
  'DashboardReportsDeleteUser'(
    parameters?: Parameters<Paths.DashboardReportsDeleteUser.PathParameters> | null,
    data?: Paths.DashboardReportsDeleteUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsDeleteUser.Responses.$200>
  /**
   * DashboardsGetOrganizationLogo - Get Organization Logo
   */
  'DashboardsGetOrganizationLogo'(
    parameters?: Parameters<Paths.DashboardsGetOrganizationLogo.PathParameters> | null,
    data?: Paths.DashboardsGetOrganizationLogo.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardsGetOrganizationLogo.Responses.$200>
  /**
   * DashboardAppLogin - Login
   */
  'DashboardAppLogin'(
    parameters?: Parameters<Paths.DashboardAppLogin.PathParameters> | null,
    data?: Paths.DashboardAppLogin.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardAppLogin.Responses.$200>
  /**
   * DashboardReportsUpsertUser - Upsert User
   */
  'DashboardReportsUpsertUser'(
    parameters?: Parameters<Paths.DashboardReportsUpsertUser.PathParameters> | null,
    data?: Paths.DashboardReportsUpsertUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsUpsertUser.Responses.$200>
  /**
   * DashboardReportsChatsSatisfaction - Chats Satisfaction
   */
  'DashboardReportsChatsSatisfaction'(
    parameters?: Parameters<Paths.DashboardReportsChatsSatisfaction.PathParameters> | null,
    data?: Paths.DashboardReportsChatsSatisfaction.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsChatsSatisfaction.Responses.$200>
  /**
   * DashboardReportsTagsUsage - Tags Usage
   */
  'DashboardReportsTagsUsage'(
    parameters?: Parameters<Paths.DashboardReportsTagsUsage.PathParameters> | null,
    data?: Paths.DashboardReportsTagsUsage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsTagsUsage.Responses.$200>
  /**
   * DashboardReportsChatAvailability - Chat Availability
   */
  'DashboardReportsChatAvailability'(
    parameters?: Parameters<Paths.DashboardReportsChatAvailability.PathParameters> | null,
    data?: Paths.DashboardReportsChatAvailability.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsChatAvailability.Responses.$200>
  /**
   * DashboardReportsMissedChats - Missed Chats
   */
  'DashboardReportsMissedChats'(
    parameters?: Parameters<Paths.DashboardReportsMissedChats.PathParameters> | null,
    data?: Paths.DashboardReportsMissedChats.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsMissedChats.Responses.$200>
  /**
   * DashboardReportsTotalChats - Total Chats
   */
  'DashboardReportsTotalChats'(
    parameters?: Parameters<Paths.DashboardReportsTotalChats.PathParameters> | null,
    data?: Paths.DashboardReportsTotalChats.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsTotalChats.Responses.$200>
  /**
   * DashboardReportsChatEngagement - Chat Engagement
   */
  'DashboardReportsChatEngagement'(
    parameters?: Parameters<Paths.DashboardReportsChatEngagement.PathParameters> | null,
    data?: Paths.DashboardReportsChatEngagement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsChatEngagement.Responses.$200>
  /**
   * DashboardReportsChatDuration - Chat Duration
   */
  'DashboardReportsChatDuration'(
    parameters?: Parameters<Paths.DashboardReportsChatDuration.PathParameters> | null,
    data?: Paths.DashboardReportsChatDuration.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsChatDuration.Responses.$200>
  /**
   * DashboardReportsFirstResponseTime - First Response Time
   */
  'DashboardReportsFirstResponseTime'(
    parameters?: Parameters<Paths.DashboardReportsFirstResponseTime.PathParameters> | null,
    data?: Paths.DashboardReportsFirstResponseTime.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsFirstResponseTime.Responses.$200>
  /**
   * DashboardReportsAgentPerformance - Agent Performance
   */
  'DashboardReportsAgentPerformance'(
    parameters?: Parameters<Paths.DashboardReportsAgentPerformance.PathParameters> | null,
    data?: Paths.DashboardReportsAgentPerformance.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsAgentPerformance.Responses.$200>
  /**
   * DashboardReportsResponseTime - Response Time
   */
  'DashboardReportsResponseTime'(
    parameters?: Parameters<Paths.DashboardReportsResponseTime.PathParameters> | null,
    data?: Paths.DashboardReportsResponseTime.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsResponseTime.Responses.$200>
  /**
   * DashboardWhiteLabel - White Label
   */
  'DashboardWhiteLabel'(
    parameters?: Parameters<Paths.DashboardWhiteLabel.PathParameters> | null,
    data?: Paths.DashboardWhiteLabel.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardWhiteLabel.Responses.$200>
  /**
   * DashboardReportsListTags - List Tags
   */
  'DashboardReportsListTags'(
    parameters?: Parameters<Paths.DashboardReportsListTags.PathParameters> | null,
    data?: Paths.DashboardReportsListTags.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardReportsListTags.Responses.$200>
  /**
   * DashboardListUsers - List Users
   * 
   * Lists users.
   */
  'DashboardListUsers'(
    parameters?: Parameters<Paths.DashboardListUsers.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DashboardListUsers.Responses.$200>
  /**
   * verifyDashboardToken - Verify Dashboard Token
   * 
   * Verifies the dashboard token
   */
  'verifyDashboardToken'(
    parameters?: Parameters<Paths.VerifyDashboardToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VerifyDashboardToken.Responses.$200>
  /**
   * InstallLiveChatApp
   */
  'InstallLiveChatApp'(
    parameters?: Parameters<Paths.InstallLiveChatApp.QueryParameters & Paths.InstallLiveChatApp.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.InstallLiveChatApp.Responses.$200>
  /**
   * listGroups - List Groups
   */
  'listGroups'(
    parameters?: Parameters<Paths.ListGroups.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListGroups.Responses.$200>
  /**
   * Authenticate - Verify
   * 
   * Validates if the provided token or cookie are still valid, and returns an update cookie if said operation was successful. 
   */
  'Authenticate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Authenticate.Responses.$200>
  /**
   * GetAppDetails - Get App Details
   */
  'GetAppDetails'(
    parameters?: Parameters<Paths.GetAppDetails.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAppDetails.Responses.$200>
}

export interface PathsDictionary {
  ['/api/crm/admin/upsert_role']: {
    /**
     * crmAdminUpsertRole - Upsert Role
     * 
     * Upsert a CRM Role
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAdminUpsertRole.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAdminUpsertRole.Responses.$200>
  }
  ['/api/crm/admin/list_scopes']: {
    /**
     * crmAdminListScopes - List Scopes
     * 
     * Lists Scopes.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAdminListScopes.Responses.$200>
  }
  ['/api/crm/admin/delete_role']: {
    /**
     * crmAdminDeleteRole - Delete Role
     * 
     * Delete a CRM Role
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAdminDeleteRole.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAdminDeleteRole.Responses.$200>
  }
  ['/api/crm/admin/upsert_scope']: {
    /**
     * crmAdminUpsertScope - Upsert Scope
     * 
     * Upsert a CRM Scope
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAdminUpsertScope.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAdminUpsertScope.Responses.$200>
  }
  ['/api/crm/admin/delete_scope']: {
    /**
     * crmAdminDeleteScope - Delete Scope
     * 
     * Delete a CRM Scope
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAdminDeleteScope.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAdminDeleteScope.Responses.$200>
  }
  ['/api/crm/admin/upsert_user']: {
    /**
     * crmAdminUpsertUser - Upsert User
     * 
     * Creates a CRM user
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAdminUpsertUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAdminUpsertUser.Responses.$200>
  }
  ['/api/crm/admin/list_users']: {
    /**
     * crmAdminListUsers - List Users
     * 
     * Lists Users.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAdminListUsers.Responses.$200>
  }
  ['/api/crm/apps/list_apps']: {
    /**
     * crmAppsListApps - List Apps
     * 
     * Lists Apps.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAppsListApps.Responses.$200>
  }
  ['/api/crm/apps/list_app_kinds']: {
    /**
     * crmAppsListAppKinds - List App Kinds
     * 
     * Lists Applicatoin Kinds.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAppsListAppKinds.Responses.$200>
  }
  ['/api/crm/apps/upsert_app']: {
    /**
     * crmAppsUpsertApp - Upsert App
     * 
     * Upsert a CRM App
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAppsUpsertApp.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAppsUpsertApp.Responses.$200>
  }
  ['/api/crm/auth/verify_crm_token']: {
    /**
     * crmAuthVerifyCrmToken - Verify Token
     * 
     * Checks if the user's token is valid
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAuthVerifyCrmToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAuthVerifyCrmToken.Responses.$200>
  }
  ['/api/crm/auth/update_password']: {
    /**
     * crmAuthUpdatePassword - Update Password
     * 
     * Updates the user's password.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAuthUpdatePassword.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAuthUpdatePassword.Responses.$200>
  }
  ['/api/crm/auth/list_sessions']: {
    /**
     * crmAuthListSessions - List Sessions
     * 
     * Lists sessions.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAuthListSessions.Responses.$200>
  }
  ['/api/crm/auth/logout']: {
    /**
     * crmAuthLogOut - Log Out
     * 
     * Logs out from CRM
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAuthLogOut.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAuthLogOut.Responses.$200>
  }
  ['/api/crm/auth/deactivate_api_key']: {
    /**
     * crmAuthDeactivateApiKey - Deactivate API Key
     * 
     * Deactivates an API key.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAuthDeactivateApiKey.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAuthDeactivateApiKey.Responses.$200>
  }
  ['/api/crm/auth/create_api_key']: {
    /**
     * crmAuthCreateApiKey - Create API Key
     * 
     * Creates a new API key for the CRM user.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAuthCreateApiKey.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAuthCreateApiKey.Responses.$200>
  }
  ['/api/crm/auth/login']: {
    /**
     * crmAuthLogin - Log In
     * 
     * logins to CRM
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CrmAuthLogin.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAuthLogin.Responses.$200>
  }
  ['/api/crm/auth/list_api_keys']: {
    /**
     * crmAuthListApiKeys - List API Keys
     * 
     * Lists API keys.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CrmAuthListApiKeys.Responses.$200>
  }
  ['/api/{app_slug}/translator/config/update']: {
    /**
     * TranslatorsUpdateDetails - Update Translator Details
     */
    'post'(
      parameters?: Parameters<Paths.TranslatorsUpdateDetails.PathParameters> | null,
      data?: Paths.TranslatorsUpdateDetails.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TranslatorsUpdateDetails.Responses.$200>
  }
  ['/api/{app_slug}/translator/config/get']: {
    /**
     * TranslatorsGetDetails - Get Translator Details
     */
    'get'(
      parameters?: Parameters<Paths.TranslatorsGetDetails.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TranslatorsGetDetails.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/list_agents']: {
    /**
     * DashboardListAgents - List Agents
     * 
     * Lists agents.
     */
    'get'(
      parameters?: Parameters<Paths.DashboardListAgents.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardListAgents.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/logout']: {
    /**
     * dashboardLogOut - Log Out
     * 
     * Logs out from dashboard
     */
    'post'(
      parameters?: Parameters<Paths.DashboardLogOut.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardLogOut.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/filters/delete_filter']: {
    /**
     * DashboardDeleteUserFilter - Delete user filters
     * 
     * Deletes user filters.
     */
    'post'(
      parameters?: Parameters<Paths.DashboardDeleteUserFilter.PathParameters> | null,
      data?: Paths.DashboardDeleteUserFilter.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardDeleteUserFilter.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/filters/upsert_filter']: {
    /**
     * DashboardUpsertUserFilter - Upsert user filters
     * 
     * Upserts user filters.
     */
    'post'(
      parameters?: Parameters<Paths.DashboardUpsertUserFilter.PathParameters> | null,
      data?: Paths.DashboardUpsertUserFilter.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardUpsertUserFilter.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/filters/list_filters']: {
    /**
     * DashboardListUserFilters - List user filters
     * 
     * Lists user filters.
     */
    'get'(
      parameters?: Parameters<Paths.DashboardListUserFilters.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardListUserFilters.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/list_groups']: {
    /**
     * DashboardListGroups - List Groups
     * 
     * Lists groups.
     */
    'get'(
      parameters?: Parameters<Paths.DashboardListGroups.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardListGroups.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/get_organization_details']: {
    /**
     * DashboardGetOrganizationDetails - Get Organization Details
     */
    'get'(
      parameters?: Parameters<Paths.DashboardGetOrganizationDetails.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardGetOrganizationDetails.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/list_archives']: {
    /**
     * DashboardListArchives - List Archives
     */
    'post'(
      parameters?: Parameters<Paths.DashboardListArchives.PathParameters> | null,
      data?: Paths.DashboardListArchives.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardListArchives.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/delete_user']: {
    /**
     * DashboardReportsDeleteUser - Delete User
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsDeleteUser.PathParameters> | null,
      data?: Paths.DashboardReportsDeleteUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsDeleteUser.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/get_organization_logo']: {
    /**
     * DashboardsGetOrganizationLogo - Get Organization Logo
     */
    'post'(
      parameters?: Parameters<Paths.DashboardsGetOrganizationLogo.PathParameters> | null,
      data?: Paths.DashboardsGetOrganizationLogo.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardsGetOrganizationLogo.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/login']: {
    /**
     * DashboardAppLogin - Login
     */
    'post'(
      parameters?: Parameters<Paths.DashboardAppLogin.PathParameters> | null,
      data?: Paths.DashboardAppLogin.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardAppLogin.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/upsert_user']: {
    /**
     * DashboardReportsUpsertUser - Upsert User
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsUpsertUser.PathParameters> | null,
      data?: Paths.DashboardReportsUpsertUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsUpsertUser.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/chats_satisfaction']: {
    /**
     * DashboardReportsChatsSatisfaction - Chats Satisfaction
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsChatsSatisfaction.PathParameters> | null,
      data?: Paths.DashboardReportsChatsSatisfaction.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsChatsSatisfaction.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/tags_usage']: {
    /**
     * DashboardReportsTagsUsage - Tags Usage
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsTagsUsage.PathParameters> | null,
      data?: Paths.DashboardReportsTagsUsage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsTagsUsage.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/chat_availability']: {
    /**
     * DashboardReportsChatAvailability - Chat Availability
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsChatAvailability.PathParameters> | null,
      data?: Paths.DashboardReportsChatAvailability.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsChatAvailability.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/missed_chats']: {
    /**
     * DashboardReportsMissedChats - Missed Chats
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsMissedChats.PathParameters> | null,
      data?: Paths.DashboardReportsMissedChats.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsMissedChats.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/total_chats']: {
    /**
     * DashboardReportsTotalChats - Total Chats
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsTotalChats.PathParameters> | null,
      data?: Paths.DashboardReportsTotalChats.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsTotalChats.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/chat_engagement']: {
    /**
     * DashboardReportsChatEngagement - Chat Engagement
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsChatEngagement.PathParameters> | null,
      data?: Paths.DashboardReportsChatEngagement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsChatEngagement.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/chat_duration']: {
    /**
     * DashboardReportsChatDuration - Chat Duration
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsChatDuration.PathParameters> | null,
      data?: Paths.DashboardReportsChatDuration.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsChatDuration.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/first_response_time']: {
    /**
     * DashboardReportsFirstResponseTime - First Response Time
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsFirstResponseTime.PathParameters> | null,
      data?: Paths.DashboardReportsFirstResponseTime.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsFirstResponseTime.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/agent_performance']: {
    /**
     * DashboardReportsAgentPerformance - Agent Performance
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsAgentPerformance.PathParameters> | null,
      data?: Paths.DashboardReportsAgentPerformance.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsAgentPerformance.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/response_time']: {
    /**
     * DashboardReportsResponseTime - Response Time
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsResponseTime.PathParameters> | null,
      data?: Paths.DashboardReportsResponseTime.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsResponseTime.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/white_label']: {
    /**
     * DashboardWhiteLabel - White Label
     */
    'post'(
      parameters?: Parameters<Paths.DashboardWhiteLabel.PathParameters> | null,
      data?: Paths.DashboardWhiteLabel.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardWhiteLabel.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/reports/list_tags']: {
    /**
     * DashboardReportsListTags - List Tags
     */
    'post'(
      parameters?: Parameters<Paths.DashboardReportsListTags.PathParameters> | null,
      data?: Paths.DashboardReportsListTags.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardReportsListTags.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/list_users']: {
    /**
     * DashboardListUsers - List Users
     * 
     * Lists users.
     */
    'get'(
      parameters?: Parameters<Paths.DashboardListUsers.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DashboardListUsers.Responses.$200>
  }
  ['/api/{app_slug}/dashboard/verify']: {
    /**
     * verifyDashboardToken - Verify Dashboard Token
     * 
     * Verifies the dashboard token
     */
    'get'(
      parameters?: Parameters<Paths.VerifyDashboardToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VerifyDashboardToken.Responses.$200>
  }
  ['/api/{app_slug}/install']: {
    /**
     * InstallLiveChatApp
     */
    'get'(
      parameters?: Parameters<Paths.InstallLiveChatApp.QueryParameters & Paths.InstallLiveChatApp.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.InstallLiveChatApp.Responses.$200>
  }
  ['/api/{app_slug}/lc/list_groups']: {
    /**
     * listGroups - List Groups
     */
    'get'(
      parameters?: Parameters<Paths.ListGroups.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListGroups.Responses.$200>
  }
  ['/api/{app_slug}/auth/verify']: {
    /**
     * Authenticate - Verify
     * 
     * Validates if the provided token or cookie are still valid, and returns an update cookie if said operation was successful. 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Authenticate.Responses.$200>
  }
  ['/api/{app_slug}/app_details']: {
    /**
     * GetAppDetails - Get App Details
     */
    'get'(
      parameters?: Parameters<Paths.GetAppDetails.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAppDetails.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type A9A8Be53909Cf4133D06Aa7D49329Cd7 = Components.Schemas.A9A8Be53909Cf4133D06Aa7D49329Cd7;
export type APIKey = Components.Schemas.APIKey;
export type Access = Components.Schemas.Access;
export type Agent = Components.Schemas.Agent;
export type AgentPerformanceReport = Components.Schemas.AgentPerformanceReport;
export type Answer = Components.Schemas.Answer;
export type App = Components.Schemas.App;
export type AppOAuth = Components.Schemas.AppOAuth;
export type AppOnOrganization = Components.Schemas.AppOnOrganization;
export type AppOrganizationAuth = Components.Schemas.AppOrganizationAuth;
export type Attachment = Components.Schemas.Attachment;
export type Automation = Components.Schemas.Automation;
export type AvailabilityFilters = Components.Schemas.AvailabilityFilters;
export type AvailabilityRecord = Components.Schemas.AvailabilityRecord;
export type AvailabilityReport = Components.Schemas.AvailabilityReport;
export type AvailabilityRequest = Components.Schemas.AvailabilityRequest;
export type Button = Components.Schemas.Button;
export type Chat = Components.Schemas.Chat;
export type ChatDurationReport = Components.Schemas.ChatDurationReport;
export type ChatProperties = Components.Schemas.ChatProperties;
export type ChatsSatisfactionReport = Components.Schemas.ChatsSatisfactionReport;
export type Child = Components.Schemas.Child;
export type CodeGrantResponse = Components.Schemas.CodeGrantResponse;
export type Contact = Components.Schemas.Contact;
export type CronJob = Components.Schemas.CronJob;
export type CustomVariable = Components.Schemas.CustomVariable;
export type Customer = Components.Schemas.Customer;
export type CustomerNotes = Components.Schemas.CustomerNotes;
export type DashboardDetails = Components.Schemas.DashboardDetails;
export type DashboardFilter = Components.Schemas.DashboardFilter;
export type DashboardSession = Components.Schemas.DashboardSession;
export type DashboardUser = Components.Schemas.DashboardUser;
export type DurationFilters = Components.Schemas.DurationFilters;
export type DurationRecord = Components.Schemas.DurationRecord;
export type DurationRequest = Components.Schemas.DurationRequest;
export type Element = Components.Schemas.Element;
export type EngagementFilters = Components.Schemas.EngagementFilters;
export type EngagementRecord = Components.Schemas.EngagementRecord;
export type EngagementReport = Components.Schemas.EngagementReport;
export type Event = Components.Schemas.Event;
export type EventProperties = Components.Schemas.EventProperties;
export type Field = Components.Schemas.Field;
export type FirstResponseTimeFilters = Components.Schemas.FirstResponseTimeFilters;
export type FirstResponseTimeRecord = Components.Schemas.FirstResponseTimeRecord;
export type FirstResponseTimeReport = Components.Schemas.FirstResponseTimeReport;
export type FirstResponseTimeRequest = Components.Schemas.FirstResponseTimeRequest;
export type Flags = Components.Schemas.Flags;
export type FluffyRouting = Components.Schemas.FluffyRouting;
export type FluffySource = Components.Schemas.FluffySource;
export type Geolocation = Components.Schemas.Geolocation;
export type HelpDeskListAgentsResponse = Components.Schemas.HelpDeskListAgentsResponse;
export type Image = Components.Schemas.Image;
export type LastPage = Components.Schemas.LastPage;
export type LastVisit = Components.Schemas.LastVisit;
export type Lc2 = Components.Schemas.Lc2;
export type ListArchivesPayload = Components.Schemas.ListArchivesPayload;
export type ListBotsPayload = Components.Schemas.ListBotsPayload;
export type ListTagsPayload = Components.Schemas.ListTagsPayload;
export type LiveChatAccountInfoResponse = Components.Schemas.LiveChatAccountInfoResponse;
export type LiveChatListAgentsResponse = Components.Schemas.LiveChatListAgentsResponse;
export type Meeting = Components.Schemas.Meeting;
export type Message = Components.Schemas.Message;
export type MissedChatsFilters = Components.Schemas.MissedChatsFilters;
export type MissedChatsRecord = Components.Schemas.MissedChatsRecord;
export type MissedChatsReport = Components.Schemas.MissedChatsReport;
export type Organization = Components.Schemas.Organization;
export type PerformanceAgentRecord = Components.Schemas.PerformanceAgentRecord;
export type PerformanceFilters = Components.Schemas.PerformanceFilters;
export type PerformanceRequest = Components.Schemas.PerformanceRequest;
export type PerformanceSummary = Components.Schemas.PerformanceSummary;
export type PurpleRouting = Components.Schemas.PurpleRouting;
export type PurpleSource = Components.Schemas.PurpleSource;
export type RatingsFilters = Components.Schemas.RatingsFilters;
export type RatingsRecord = Components.Schemas.RatingsRecord;
export type ResponseTimeFilters = Components.Schemas.ResponseTimeFilters;
export type ResponseTimeRecord = Components.Schemas.ResponseTimeRecord;
export type ResponseTimeReport = Components.Schemas.ResponseTimeReport;
export type ResponseTimeRequest = Components.Schemas.ResponseTimeRequest;
export type RichTextObj = Components.Schemas.RichTextObj;
export type Role = Components.Schemas.Role;
export type RoleOnUser = Components.Schemas.RoleOnUser;
export type Scope = Components.Schemas.Scope;
export type ScopeOnRole = Components.Schemas.ScopeOnRole;
export type Settings = Components.Schemas.Settings;
export type Signature = Components.Schemas.Signature;
export type Statistics = Components.Schemas.Statistics;
export type Supervising = Components.Schemas.Supervising;
export type TagPayload = Components.Schemas.TagPayload;
export type TagsUsageReport = Components.Schemas.TagsUsageReport;
export type TestInterface = Components.Schemas.TestInterface;
export type TextVars = Components.Schemas.TextVars;
export type Thread = Components.Schemas.Thread;
export type ThreadProperties = Components.Schemas.ThreadProperties;
export type Ticket = Components.Schemas.Ticket;
export type TicketEvent = Components.Schemas.TicketEvent;
export type TotalChatsFilters = Components.Schemas.TotalChatsFilters;
export type TotalChatsRecord = Components.Schemas.TotalChatsRecord;
export type TotalChatsReport = Components.Schemas.TotalChatsReport;
export type TranslatorAgentMapping = Components.Schemas.TranslatorAgentMapping;
export type TranslatorDetails = Components.Schemas.TranslatorDetails;
export type TranslatorGroupMapping = Components.Schemas.TranslatorGroupMapping;
export type TranslatorUsage = Components.Schemas.TranslatorUsage;
export type User = Components.Schemas.User;
export type UserSession = Components.Schemas.UserSession;
