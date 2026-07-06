import type { ItemRaw } from "../types";

import logs from "./logs.png";
import wrkRedis from "./wrk-redis.png";
import wrkUsers from "./wrk-users.png";
import health from "./scalar-health-group.png";
import tokens from "./post-tokens.png";
import endpoints from "./endpoints.png";
import errorModel from "./validation-error-response-model.png";



export const item: ItemRaw = {
	pin: true,
	cover: logs,
	title: "Bun, ElysiaJS, Drizzle ORM 기반 REST API 서버",
	description: [
		"새로운 기술 스택인 Bun과 ElysiaJS, Drizzle ORM의 학습을 목적으로 설계한 RESTful API 서버입니다.",
		"단순한 학습을 넘어, RBAC 기반의 권한 관리, JWT 토큰 생명주기 제어, 시스템 리소스 모니터링 등 실제 서비스 운영에 필요한 핵심 인프라 로직을 아키텍처 레벨에서 고민하며 설계하였습니다.",
	],
	period: [
		new Date("2025-07-19"),
		new Date("2025-09-05"),
	],
	tags: [
		"backend",
	],
	skills: [
		"bun",
		"elysia",
		"typescript",
		"drizzle-orm",
		"redis",
	],
	articles: [
		{
			blocks: [
				{
					media: {
						type: "image",
						src: logs,
						alt: "elysia 서버 로그 캡쳐",
					},
					text: [
						"Bun 런타임과 ElysiaJS, Drizzle ORM을 결합하여 오버헤드를 극소화한 고성능 서버 환경을 구축했습니다.",
						"각 기술 스택의 경량화된 특성을 활용해 밀리초(ms) 단위의 빠른 응답 속도를 확보했으며, 구조화된 실시간 서버 로그 시스템을 통해 모든 API 요청의 생명주기를 추적하고 성능 병목 지점을 체계적으로 검증할 수 있도록 구현했습니다.",
					],
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: wrkRedis,
						alt: "wrk 벤치마크 결과 캡쳐",
						caption: "logging 미적용 + 단일 프로세스 상태에서의 벤치마크 결과 - redis ping 테스트",
					},
				},
				{
					media: {
						type: "image",
						src: wrkUsers,
						alt: "wrk 벤치마크 결과 캡쳐",
						caption: "logging 미적용 + 단일 프로세스 상태에서의 벤치마크 결과 - 사용자 조회 API 테스트",
					},
				},
			],
		},
		{
			blocks: [
				{
					text: [
						"Bun과 ElysiaJS 환경에서 I/O 처리의 한계 성능과 실무 시나리오의 안정성을 다각도로 검증했습니다.",
						"인메모리(Redis) 기반 헬스 체크 시 초당 약 41,700건(RPS)의 요청을 처리하는 압도적인 처리량을 확인했으며, 실제 Drizzle ORM을 통한 PostgreSQL DB 조회 로직에서도 평균 12.7ms, P99 기준 16.5ms라는 저지연 응답 속도를 유지했습니다.",
						"별도의 클러스터링 없이 단일 프로세스만으로 달성한 이 수치들은, 데이터 집약적인 비즈니스 로직에서도 극도의 리소스 효율성과 예측 가능한 안정성을 확보할 수 있음을 증명합니다.",
					],
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: health,
						alt: "헬스체크 엔드포인트 목록",
					},
					text: [
						"안정적인 서비스 운영을 위해 시스템의 가용성을 다각도로 검증하는 세분화된 Health Check API를 설계했습니다.",
						"단순히 서버의 생존 여부만 확인하는 수준을 넘어, 데이터베이스와 Redis 등 외부 의존성 상태를 독립적으로 모니터링할 수 있는 엔드포인트를 구축했습니다.",
					],
				},
				{
					media: {
						type: "image",
						src: tokens,
						alt: "토큰 발급 요청 및 응답",
					},
					text: [
						"보안성과 사용자 경험을 모두 고려한 표준 기반의 JWT 인증 시스템을 구축했습니다.",
						"Access Token의 짧은 생명주기를 통해 보안 위협을 최소화하고, Refresh Token을 활용한 재발급 매커니즘을 구현하여 사용자의 끊김 없는 서비스를 구현할 수 있도록 합니다.",
						"OAuth 2.0 형식을 차용한 grant_type 구조와 정교한 토큰 만료 정책 설계를 통해, 실제 상용 서비스 수준의 안전한 인증 인프라를 구현하는 데 집중했습니다.",
					],
				},
			],
		},
		{
			blocks: [
				{
					colSpan: 1,
					media: {
						type: "image",
						src: endpoints,
						alt: "엔드포인트 목록",
					},
					text: [
						"RESTful 원칙에 기반하여 설계된 세분화된 API 리소스 구조입니다.",
						"RBAC를 아키텍처의 핵심으로 삼아, Roles와 Permissions 간의 다대다 관계를 직관적으로 조작할 수 있는 엔드포인트를 구축했습니다.",
						"또한, 개발 과정에서의 가시성 확보를 위해 전체 API 명세를 한눈에 파악할 수 있는 내부 스크립트를 운용하여, 복잡한 인프라 로직 내에서도 일관성 있는 인터페이스 설계를 유지했습니다.",
					],
				},
				{
					colSpan: 2,
					media: {
						type: "image",
						src: errorModel,
						alt: "에러 모델",
					},
					text: [
						"신뢰성 있는 클라이언트-서버 통신을 위해 에러 응답 구조를 표준화했습니다.",
						"유효성 검증 실패 시 에러의 발생 위치(`body`, `query`, `params` 등)와 세부 원인을 구조화된 데이터로 제공하여, 프론트엔드에서 즉각적으로 예외 상황을 처리하고 사용자에게 정확한 피드백을 전달할 수 있도록 설계했습니다.",
					],
				},
			],
		},
	],
};
